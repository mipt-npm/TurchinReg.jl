module StatReg

    using QuadGK, LinearAlgebra, Dierckx, Memoize, ApproxFun
    using Optim
    using Logging
    using Polynomials
    using PiecewisePolynomials
    using BAT, ValueShapes, Distributions
    using AdvancedHMC, Distributions, ForwardDiff
    using TransformVariables, LogDensityProblems, DynamicHMC, Parameters, Random

    include("./utils/utils.jl")
    include("./bases/bases.jl")
    include("./solution_utils/solution_utils.jl")
    include("./solvers/solvers.jl")

    export BaseFunction, Basis, omega, FourierBasis, CubicSplineBasis, LegendreBasis, BernsteinBasis, discretize_kernel
    export GaussErrorMatrixUnfolder, solve, GaussErrorUnfolder, simple_solver
    export PhiVec
    export config, Config
    export MCMCMatrixUnfolder, MCMCUnfolder
    export getOpticsKernels

end
