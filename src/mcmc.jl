using Mamba

include("basis.jl")
include("vector.jl")
include("config.jl")
include("gauss_error.jl")
include("check.jl")


"""
MCMC model for dicsrete data and kernel.

**Constructor**

```julia
MCMCMatrixUnfolder(
    omegas::Array{Array{Float64, 2} ,1},
    method::String="EmpiricalBayes",
    alphas::Union{Array{Float64, 1}, Nothing}=nothing,
    low::Union{Array{Float64, 1}, Nothing}=nothing,
    high::Union{Array{Float64, 1}, Nothing}=nothing,
    alpha0::Union{Array{Float64, 1}, Nothing}=nothing
    )
```
`omegas` -- array of matrices that provide information about basis functions

`method` -- constant selection method, possible options: "EmpiricalBayes" and "User"

`alphas` -- array of constants, in case method="User" should be provided by user

`low` -- lower limits for alphas

`high` -- higher limits for alphas

`alpha0` -- unitial values for alphas

**Fields**

* `omegas::Array{Array{Float64, 2} ,1}`
* `n::Int64` -- size of square omega matrix
* `method::String`
* `alphas::Union{Array{Float64}, Nothing}`
* `low::Union{Array{Float64, 1}, Nothing}`
* `high::Union{Array{Float64, 1}, Nothing}`
* `alpha0::Union{Array{Float64, 1}, Nothing}`
"""
mutable struct MCMCMatrixUnfolder
    omegas::Array{Array{Float64, 2} ,1}
    n::Int64
    method::String
    alphas::Union{Array{Float64}, Nothing}
    low::Union{Array{Float64, 1}, Nothing}
    high::Union{Array{Float64, 1}, Nothing}
    alpha0::Union{Array{Float64, 1}, Nothing}

    function MCMCMatrixUnfolder(
        omegas::Array{Array{Float64, 2} ,1},
        method::String="EmpiricalBayes",
        alphas::Union{Array{Float64, 1}, Nothing}=nothing,
        low::Union{Array{Float64, 1}, Nothing}=nothing,
        high::Union{Array{Float64, 1}, Nothing}=nothing,
        alpha0::Union{Array{Float64, 1}, Nothing}=nothing
        )
        m = check_args(omegas, method, alphas, low, high, alpha0)
        @info "MCMCMatrixUnfolder is created."
        return new(omegas, m, method, alphas, low, high, alpha0)
    end
end


"""
MCMC solver for dicsrete data and kernel.

```julia
solve(
    unfolder::MCMCMatrixUnfolder,
    kernel::Array{Float64, 2},
    data::Array{Float64, 1},
    data_errors::Union{Array{Float64, 1}, Array{Float64, 2}},
    chains::Int64 = 1,
    samples::Int64 = 10 * 1000
    )
```

**Arguments**
* `unfolder::MCMCMatrixUnfolder` -- model
* `kernel::Array{Float64, 2}` -- discrete kernel
* `data::Array{Float64, 1}` -- function values
* `data_errors::Union{Array{Float64, 1}, Array{Float64, 2}}` -- function errors
* `chains` -- number of chains for MCMC integration
* `samples` -- number of samples for MCMC integration

**Returns:** `Dict{String, Array{Float64, 1}}` with coefficients ("coeff") and errors ("errors").
"""
function solve(
    unfolder::MCMCMatrixUnfolder,
    kernel::Array{Float64, 2},
    data::Array{Float64, 1},
    data_errors::Union{Array{Float64, 1}, Array{Float64, 2}},
    chains::Int64 = 1,
    samples::Int64 = 10 * 1000
    )

    @info "Starting solve..."
    data_errors = check_args(unfolder, kernel, data, data_errors)
    data_errors = check_args(unfolder, kernel, data, data_errors)
    data_errorsInv = make_sym(pinv(data_errors))
    B = make_sym(transpose(kernel) * data_errorsInv * kernel)
    b = transpose(kernel) * transpose(data_errorsInv) * data
    alpha0 = unfolder.alpha0
    if unfolder.method == "EmpiricalBayes"
        unfolder.alphas = find_optimal_alpha(
            unfolder.omegas, B, b,
            unfolder.alpha0, unfolder.low, unfolder.high
            )
    elseif unfolder.method != "User"
        @error "Unknown method" + unfolder.method
        Base.eror("Unknown method" + unfolder.method)
    end
    @info "Ending solve..."
    return solve_MCMC(unfolder, kernel, data, data_errors, chains, samples)
end

function solve_MCMC(
    unfolder::MCMCMatrixUnfolder,
    kernel::Array{Float64, 2},
    data::Array{Float64, 1},
    data_errors::Array{Float64, 2},
    chains::Int64 = 1,
    samples::Int64 = 10 * 1000
    )
    @info "Starting solve_MCMC..."
    model = Model(
        phi = Stochastic(1, (n, sigma) ->  MvNormal(zeros(n), sigma)),
        mu = Logical(1, (kernel, phi) -> kernel * phi, false),
        f = Stochastic(1, (mu, data_errors) ->  MvNormal(mu, data_errors), false),
        )

    scheme = [NUTS([:phi])]

    line = Dict{Symbol, Any}(
        :f => data,
        :kernel => kernel,
        :data_errors => data_errors,
        :n => unfolder.n,
        :sigma => make_sym(pinv(unfolder.alphas[1] * unfolder.omegas[1])),
        )

    inits = [Dict{Symbol, Any}(
            :phi => rand(Normal(0, 1), unfolder.n),
            :f => data
            ) for i in 1:chains]

    setsamplers!(model, scheme)
    @info "Ending solve_MCMC..."
    return model, line, inits, samples, 250, 2, chains
end


"""
Allows to get coefficients and errors from generated data set.

```julia
get_values(sim::ModelChains, chains::Int64, n::Int64)
```

**Arguments**
* `sim::ModelChains` -- data generated by `mcmc()`
* `chains::Int64` -- number of chains
* `n::Int64` -- variable list length

**Returns:** `Dict{String, Array{Float64, 1}}` with coefficients ("coeff") and errors ("errors").

"""
function get_values(sim::ModelChains, chains::Int64, n::Int64)
    values = [sim.value[:, :, j] for j in range(1, stop=chains)]
    res =  mean(values)
    coeff = []
    cov_ = cov(res)
    for i in range(1, stop=n)
        append!(coeff, mean(res[:, i]))
    end
    return Dict(
        "coeff" => convert(Array{Float64}, coeff),
        "errors" => cov(res),
        )
end


"""
MCMC model for continuous kernel. Data can be either discrete or continuous.

**Constructor**

```julia
MCMCUnfolder(
    basis::Basis,
    omegas::Array{Array{Float64, 2}, 1},
    method::String="EmpiricalBayes",
    alphas::Union{Array{Float64, 1}, Nothing}=nothing,
    low::Union{Array{Float64, 1}=nothing,
    high::Union{Array{Float64, 1}, Nothing}=nothing,
    alpha0::Union{Array{Float64, 1}, Nothing}=nothing,
    )
```

`basis` -- basis for reconstruction

`omegas` -- array of matrices that provide information about basis functions

`method` -- constant selection method, possible options: "EmpiricalBayes" and "User"

`alphas` -- array of constants, in case method="User" should be provided by user


**Fields**
* `basis::Basis`
* `solver::MCMCMatrixUnfolder`
"""
mutable struct MCMCUnfolder
    basis::Basis
    solver::MCMCMatrixUnfolder

    function MCMCUnfolder(
        basis::Basis,
        omegas::Array{Array{Float64, 2}, 1},
        method::String="EmpiricalBayes",
        alphas::Union{Array{Float64, 1}, Nothing}=nothing,
        low::Union{Array{Float64, 1}, Nothing}=nothing,
        high::Union{Array{Float64, 1}, Nothing}=nothing,
        alpha0::Union{Array{Float64, 1}, Nothing}=nothing,
        )
        solver = MCMCMatrixUnfolder(
            omegas, method, alphas, low, high, alpha0
        )
        @info "MCMCUnfolder is created."
        return new(basis, solver)
    end
end


"""
```julia
solve(
    mcmcunfolder::MCMCUnfolder,
    kernel::Union{Function, Array{Float64, 2}},
    data::Union{Function, Array{Float64, 1}},
    data_errors::Union{Function, Array{Float64, 1}},
    y::Union{Array{Float64, 1}, Nothing}=nothing,
    chains::Int64 = 1,
    samples::Int64 = 10 * 1000
    )
```

**Arguments**
* `gausserrorunfolder::GaussErrorUnfolder` -- model
* `kernel::Union{Function, Array{Float64, 2}}` -- discrete or continuous kernel
* `data::Union{Function, Array{Float64, 1}}` -- function values
* `data_errors::Union{Function, Array{Float64, 1}}` -- function errors
* `y::Union{Array{Float64, 1}, Nothing}` -- points to calculate function values and its errors (when data is given as a function)
* `chains` -- number of chains for MCMC integration
* `samples` -- number of samples for MCMC integration

**Returns:** `Dict{String, Array{Float64, 1}}` with coefficients ("coeff") and errors ("errors").
"""
function solve(
    mcmcunfolder::MCMCUnfolder,
    kernel::Union{Function, Array{Float64, 2}},
    data::Union{Function, Array{Float64, 1}},
    data_errors::Union{Function, Array{Float64, 1}},
    y::Union{Array{Float64, 1}, Nothing}=nothing,
    chains::Int64 = 1,
    samples::Int64 = 10 * 1000
    )
    @info "Starting solve..."
    kernel_array, data_array, data_errors_array = check_args(
        mcmcunfolder, kernel, data, data_errors, y
        )
    result = solve(
        mcmcunfolder.solver,
        kernel_array, data_array, data_errors_array,
        chains, samples
        )
    @info "Ending solve..."
    return result
end
