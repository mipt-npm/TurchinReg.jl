var documenterSearchIndex = {"docs":
[{"location":"#Statreg.jl-1","page":"Home","title":"Statreg.jl","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"This is the documentation for Statreg.jl; a Julia package that allows to apply Turchin's method of statistical regularisation to solve the Fredholm equation of the first kind.","category":"page"},{"location":"#","page":"Home","title":"Home","text":"Let's consider the equation","category":"page"},{"location":"#","page":"Home","title":"Home","text":"f(y) = int_a^b K(x y) varphi(x) dx","category":"page"},{"location":"#","page":"Home","title":"Home","text":"The problem is, given kernel function K(x y) and the function f(y), to find the function varphi(x). f(y) contains a random noise factor both from initial statistical uncertainty of varphi(x) and additional noise from measurement procedure. The equation is ill-posed: a small error in the measurement of f(y) leads to big instability of varphi(x). Solving such ill-posed problems requires operation called regularisation. It means we need to introduce additional information to make problem well-posed one.","category":"page"},{"location":"#","page":"Home","title":"Home","text":"The idea of statistical regularisation is to look on the problem from the point of view of Bayesian statistics approach: unknown statistical value varphi(x) could be reconstructed using measured value f(y), the kernel K(x y) and some prior information about varphi(x) behaviour: smoothness, constraints on boundary conditions, non-negativity, etc. Also it is important to note that statistical regularisation allows to estimate errors of obtained solution. More information about the theory of statistical regularisation you can find in insert link, but the main concepts will be explained further in this documentation.","category":"page"},{"location":"#Description-of-statistical-regularisation’s-method-1","page":"Home","title":"Description of statistical regularisation’s method","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"Firstly, it is necessary to go from the continuous space of functions to the parameterised discrete representation. We should introduce basis  psi_k _k=1^N, in which the required function will be calculated. Then the Fredholm equation will go to the matrix equation:","category":"page"},{"location":"#","page":"Home","title":"Home","text":"f_m = K_mn varphi_n","category":"page"},{"location":"#","page":"Home","title":"Home","text":"where f_m = f(y_m), varphi_n:  varphi(x) = sum_k=1^N varphi_n psi_k(x), K_mn = int_a^b K(x y_m) psi_n(x) dx.","category":"page"},{"location":"#","page":"Home","title":"Home","text":"Let's introduce function overrightarrowS that will evaluate overrightarrowvarphi based on the function overrightarrowf and loss function L(overrightarrowwidehatvarphi overrightarrowS) = sum_n=1^N mu_n (widehatvarphi_n - S_n)^2, where overrightarrowwidehatvarphi=overrightarrowwidehatS(overrightarrowf) – the best solution.","category":"page"},{"location":"#","page":"Home","title":"Home","text":"For this loss function the best strategy is","category":"page"},{"location":"#","page":"Home","title":"Home","text":"overrightarrowwidehatSf=Eoverrightarrowvarphioverrightarrowf=int overrightarrowvarphi P(overrightarrowvarphioverrightarrowf) doverrightarrowvarphi","category":"page"},{"location":"#","page":"Home","title":"Home","text":"P(overrightarrowvarphioverrightarrowf) = fracP(overrightarrowvarphi)P(overrightarrowfoverrightarrowvarphi)int doverrightarrowvarphiP(overrightarrowvarphi)P(overrightarrowfoverrightarrowvarphi)","category":"page"},{"location":"#","page":"Home","title":"Home","text":"Errors of the solution:","category":"page"},{"location":"#","page":"Home","title":"Home","text":" sigma_n^2  = int (varphi_n - widehatS_n)^2 P(overrightarrowvarphioverrightarrowf)doverrightarrowvarphi","category":"page"},{"location":"#Smoothness-as-a-prior-information-1","page":"Home","title":"Smoothness as a prior information","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"We expect varphi(x) to be relatively smooth and can choose this information as a prior. The matrix of the mean value of derivatives of order p can be used as a prior information about the solution.","category":"page"},{"location":"#","page":"Home","title":"Home","text":"Omega_mn = int_a^b left( fracd^p psi_m(x)dx right) left( fracd^p psi_n(x)dx right) dx","category":"page"},{"location":"#","page":"Home","title":"Home","text":"We require that a certain value of the smoothness functional be achieved:","category":"page"},{"location":"#","page":"Home","title":"Home","text":"int (overrightarrowvarphi Omega overrightarrowvarphi) P(overrightarrowvarphi)doverrightarrowvarphi=omega","category":"page"},{"location":"#","page":"Home","title":"Home","text":"Then the overrightarrowvarphi probability distribution depending on the parameter:","category":"page"},{"location":"#","page":"Home","title":"Home","text":"P_alpha(overrightarrowvarphi)=fracalpha^Rg(Omega)2 sqrtdet(Omega)(2pi)^N2expleft( -frac12 (overrightarrowvarphi Omega overrightarrowvarphi) right)","category":"page"},{"location":"#","page":"Home","title":"Home","text":"where alpha=frac1omega.","category":"page"},{"location":"#","page":"Home","title":"Home","text":"The value of the parameter alpha is unknown, and can be obtained in the following ways:","category":"page"},{"location":"#","page":"Home","title":"Home","text":"directly from some external data or manually selected\nas a maximum of a posterior information P(alphaoverrightarrowf)\nas the mean of all possible alpha, defining the prior probability density as P(overrightarrowvarphi)=int dalpha P(alpha) P(overrightarrowvarphialpha) (all alpha are equally probable).","category":"page"},{"location":"#Gaussian-random-process-1","page":"Home","title":"Gaussian random process","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"The most common case is when the variation of the experimental results is subject to the normal distribution. In this case, the regularisation has an analytical solution. Let the measurement vector f have errors described by a multidimensional Gaussian distribution with a covariance matrix Sigma:","category":"page"},{"location":"#","page":"Home","title":"Home","text":"P(overrightarrowfoverrightarrowvarphi)=frac1(2pi)^N2Sigma^12expleft( -frac12 (overrightarrowf - Koverrightarrowvarphi)^T Sigma^-1 (overrightarrowf - Koverrightarrowvarphi) right)","category":"page"},{"location":"#","page":"Home","title":"Home","text":"Using the most probable alpha, one can get the best solution:","category":"page"},{"location":"#","page":"Home","title":"Home","text":"overrightarrowwidehatS = (K^T Sigma^-1 K + alpha^* Omega)^-1 K^T Sigma^-1 T overrightarrowf","category":"page"},{"location":"#","page":"Home","title":"Home","text":"cov(varphi_m varphi_n) = (K^T Sigma^-1 K + alpha^* Omega)^-1_mn","category":"page"},{"location":"#","page":"Home","title":"Home","text":"This package allows to apply statistical regularisation in different bases using such prior information as smoothness and zero boundary conditions or another information provided by user in a matrix form. Omegacan be set manually or calculated for every derivative degree p. alpha can be calculated as a maximum of a posterior information or can be set manually.","category":"page"},{"location":"getting_started/#Getting-started-1","page":"Getting started","title":"Getting started","text":"","category":"section"},{"location":"getting_started/#Installation-1","page":"Getting started","title":"Installation","text":"","category":"section"},{"location":"getting_started/#","page":"Getting started","title":"Getting started","text":"To install StatReg.jl, start up Julia and type the following code-snipped into the REPL.","category":"page"},{"location":"getting_started/#","page":"Getting started","title":"Getting started","text":"import Pkg\nPkg.add(\"StatReg.jl\")","category":"page"},{"location":"getting_started/#Usage-1","page":"Getting started","title":"Usage","text":"","category":"section"},{"location":"getting_started/#","page":"Getting started","title":"Getting started","text":"To reconstruct function you need to load data (f(y)) and data errors (delta f(y)) and define Kernel K(x y). There are two possibilities: use vector & matrix form or continuous form. In the first case K(x y) is matrix n times m, f(y) and delta f(y) - n-dimensional vectors. In the second case K(x y) is function, f(y) and delta f(y) can be either functions or vectors. If they are functions, knot vector y should be specified.","category":"page"},{"location":"getting_started/#","page":"Getting started","title":"Getting started","text":"Define data and errors","category":"page"},{"location":"getting_started/#","page":"Getting started","title":"Getting started","text":"using StatReg\n\ny = collect(range(a, stop=b, length=20))\nf = [-0.00906047, 0.0239243, 0.168545, 0.503525, 1.27398,\n    2.08793, 2.78204, 2.5939, 1.90542, 1.13321,\n    0.88324, 1.04642, 1.14465, 1.25853, 0.977623,\n    0.621435, 0.310866, 0.117351, 0.0240617, 0.0226408]\ndelta_f = [0.00888777, -0.00480116, 0.0396684, -0.00968618, -0.0195524,\n    -0.0988949, 0.00829277, 0.0494844, -0.0445353, 0.0556071,\n    0.00347363, 0.0317405, 0.0539028, 0.0545216, 0.0870875,\n    0.0338332, -0.0121158, 0.00790281, 0.00138139, 0.00662381]\n","category":"page"},{"location":"getting_started/#","page":"Getting started","title":"Getting started","text":"Then define kernel:","category":"page"},{"location":"getting_started/#","page":"Getting started","title":"Getting started","text":"function kernel(x::Float64, y::Float64)\n    if abs(x-y) <= 1\n        return 1. -  abs(x-y)\n    end\n    return 0.\nend","category":"page"},{"location":"getting_started/#","page":"Getting started","title":"Getting started","text":"Basis:","category":"page"},{"location":"getting_started/#","page":"Getting started","title":"Getting started","text":"We use Cubic Spline Basis with knots in data points and zero boundary conditions on the both sides.","category":"page"},{"location":"getting_started/#","page":"Getting started","title":"Getting started","text":"basis = CubicSplineBasis(y, (\"dirichlet\", \"dirichlet\"))","category":"page"},{"location":"getting_started/#","page":"Getting started","title":"Getting started","text":"Model:","category":"page"},{"location":"getting_started/#","page":"Getting started","title":"Getting started","text":"To reconstruct the function we use matrix of the second derivatives as a prior information. Then we create solution model.","category":"page"},{"location":"getting_started/#","page":"Getting started","title":"Getting started","text":"omega = omega(basis, 2)\nmodel = GaussErrorUnfolder(basis, omega)","category":"page"},{"location":"getting_started/#","page":"Getting started","title":"Getting started","text":"Reconstruction:","category":"page"},{"location":"getting_started/#","page":"Getting started","title":"Getting started","text":"To reconstruct the function we use function solve() that returns dictionary containing coefficients of basis function in the sum varphi(x) = sum_k=1^N coeff_n psi_n(x), their errors sig_n (delta varphi =  sum_k=1^N sig_n psi_n(x)) and optimal parameter of smoothness alpha.","category":"page"},{"location":"getting_started/#","page":"Getting started","title":"Getting started","text":"phi_reconstruct = solve(model, kernel, f, delta_f, y)","category":"page"},{"location":"getting_started/#","page":"Getting started","title":"Getting started","text":"Results","category":"page"},{"location":"getting_started/#","page":"Getting started","title":"Getting started","text":"Presentation of results in a convenient way is possible with PhiVec:","category":"page"},{"location":"getting_started/#","page":"Getting started","title":"Getting started","text":"phivec = PhiVec(phi_reconstruct[\"coeff\"], basis, phi_reconstruct[\"sig\"])\n\nphi_reconstructed = call(phivec, x)\nphi_reconstructed_errors = errors(phivec, x)\n\nplot(x, phi_reconstructed)\nfill_between(x, phi_reconstructed - phi_reconstructed_errors, phi_reconstructed + phi_reconstructed_errors, alpha=0.3)","category":"page"},{"location":"users_guide/#User's-Guide-1","page":"User's Guide","title":"User's Guide","text":"","category":"section"},{"location":"users_guide/#Kernel-1","page":"User's Guide","title":"Kernel","text":"","category":"section"},{"location":"users_guide/#","page":"User's Guide","title":"User's Guide","text":"Kernel can be specified as a matrix or as a function. Initialize a kernel as a function:","category":"page"},{"location":"users_guide/#","page":"User's Guide","title":"User's Guide","text":"getOpticsKernels(name::String,)","category":"page"},{"location":"users_guide/#getOpticsKernels-Tuple{String}","page":"User's Guide","title":"getOpticsKernels","text":"getOpticsKernels(name::String, alpha::Float64 = 1.)\n\nArguments\n\nname - name of a kernel\nalpha - kernel function parameter\n\nReturns: kernel, function of 2 variables.\n\n\n\n\n\n","category":"method"},{"location":"users_guide/#","page":"User's Guide","title":"User's Guide","text":"Available kernels:","category":"page"},{"location":"users_guide/#","page":"User's Guide","title":"User's Guide","text":"rectangular:","category":"page"},{"location":"users_guide/#","page":"User's Guide","title":"User's Guide","text":"K(x y) =\nbegincases\n1 textif  fracx-yalpha  1\n\n0 textotherwise\nendcases","category":"page"},{"location":"users_guide/#","page":"User's Guide","title":"User's Guide","text":"diffraction:","category":"page"},{"location":"users_guide/#","page":"User's Guide","title":"User's Guide","text":"K(x y) = left(fracsin(fracpi (x-y)s_0)fracpi (x-y)s_0right)^2","category":"page"},{"location":"users_guide/#","page":"User's Guide","title":"User's Guide","text":"s_0 = fracalpha0886","category":"page"},{"location":"users_guide/#","page":"User's Guide","title":"User's Guide","text":"gaussian:","category":"page"},{"location":"users_guide/#","page":"User's Guide","title":"User's Guide","text":"K(x y) = frac2alphasqrtfracln2pie^4ln2left(fracx-yalpharight)^2","category":"page"},{"location":"users_guide/#","page":"User's Guide","title":"User's Guide","text":"triangular:","category":"page"},{"location":"users_guide/#","page":"User's Guide","title":"User's Guide","text":"K(x y) =\nbegincases\nfrac1 - fracx-yalphaalpha textif  fracx-yalpha  1\n\n0 textotherwise\nendcases","category":"page"},{"location":"users_guide/#","page":"User's Guide","title":"User's Guide","text":"dispersive:","category":"page"},{"location":"users_guide/#","page":"User's Guide","title":"User's Guide","text":"K(x y) = fracalpha2 pileft((x-y)^2 + left(fracalpha2right)^2right)","category":"page"},{"location":"users_guide/#","page":"User's Guide","title":"User's Guide","text":"exponential:","category":"page"},{"location":"users_guide/#","page":"User's Guide","title":"User's Guide","text":"K(x y) = fracln2alphae^2ln2fracx-yalpha","category":"page"},{"location":"users_guide/#","page":"User's Guide","title":"User's Guide","text":"heaviside:","category":"page"},{"location":"users_guide/#","page":"User's Guide","title":"User's Guide","text":"K(x y) =\nbegincases\n1 textif  x0\n\n0 textotherwise\nendcases","category":"page"},{"location":"users_guide/#","page":"User's Guide","title":"User's Guide","text":"discretize_kernel(basis::Basis, kernel::Function, xs::Array{Float64, 1})","category":"page"},{"location":"users_guide/#discretize_kernel-Tuple{Basis,Function,Array{Float64,1}}","page":"User's Guide","title":"discretize_kernel","text":"discretize_kernel(basis::Basis, kernel::Function, data_points::Array{Float64, 1})\n\nArguments\n\nbasis – basis\nkernel – K(x y), kernel\ndata_points – array of data points\n\nReturns: discretized kernel K::Array{Float64, 2}, K_mn = left(int_a^b K(x y) psi_m(x) dx right)(y_n) - matrix of size ntimesm, where m - number of basis functions, n - number of data points.\n\n\n\n\n\n","category":"method"},{"location":"users_guide/#Basis-1","page":"User's Guide","title":"Basis","text":"","category":"section"},{"location":"users_guide/#","page":"User's Guide","title":"User's Guide","text":"Basis","category":"page"},{"location":"users_guide/#Basis","page":"User's Guide","title":"Basis","text":"Abstract type for all bases.\n\n\n\n\n\n","category":"type"},{"location":"users_guide/#","page":"User's Guide","title":"User's Guide","text":"BaseFunction","category":"page"},{"location":"users_guide/#BaseFunction","page":"User's Guide","title":"BaseFunction","text":"Type for function with its support.\n\nConstructor\n\nBaseFunction(f, support::Tuple{Float64,Float64})\nBaseFunction(f, a::Float64, b::Float64)\n\nFields\n\nf – function (type depends on the basis)\nsupport::Tuple{Float64,Float64} – support of the function\n\n\n\n\n\n","category":"type"},{"location":"users_guide/#","page":"User's Guide","title":"User's Guide","text":"omega(basis::Basis, order::Int64)","category":"page"},{"location":"users_guide/#omega-Tuple{Basis,Int64}","page":"User's Guide","title":"omega","text":"omega(basis::Basis, order::Int64)\n\nArguments\n\nbasis - basis\norder - order of derivatives\n\nReturns: Omega::Array{Float64, 2}, Omega_mn = int_a^b fracd^order psi_mdx^order fracd^order psi_ndx^order - matrix of size ntimesn of the mean values of derivatives of order order, where n - number of functions in basis.\n\n\n\n\n\n","category":"method"},{"location":"users_guide/#Fourier-basis-1","page":"User's Guide","title":"Fourier basis","text":"","category":"section"},{"location":"users_guide/#","page":"User's Guide","title":"User's Guide","text":"FourierBasis","category":"page"},{"location":"users_guide/#FourierBasis","page":"User's Guide","title":"FourierBasis","text":"Fourier basis with length 2n+1: {05, sin(fracpi (x - fraca+b2)b-a), cos(fracpi (x - fraca+b2)b-a), ..., sin(fracpi n (x - fraca+b2)b-a), cos(fracpi n (x - fraca+b2)b-a)}.\n\nConstructor\n\nFourierBasis(a::Float64, b::Float64, n::Int64)\n\na, b – the beginning and the end of the segment\n\nn – number of basis functions\n\nFields\n\na::Float64 – beginning of the support\nb::Float64 – end of the support\nn::Int64 – number of basis functions\nbasis_functions::Array{BaseFunction, 1} – array of basis functions\n\n\n\n\n\n","category":"type"},{"location":"users_guide/#Cubic-Spline-basis-1","page":"User's Guide","title":"Cubic Spline basis","text":"","category":"section"},{"location":"users_guide/#","page":"User's Guide","title":"User's Guide","text":"CubicSplineBasis","category":"page"},{"location":"users_guide/#CubicSplineBasis","page":"User's Guide","title":"CubicSplineBasis","text":"Cubic spline basis - B-spline of the order 3 on given knots with length n-4, where n – length of knots array.\n\nConstructor\n\nCubicSplineBasis(\n    knots::Array{Float64},\n    boundary_condition::Union{Tuple{Union{String, Nothing}, Union{String, Nothing}}, Nothing, String}=nothing\n    )\n\nknots – knots of spline\n\nboundary_condition – boundary conditions of basis functions. If tuple, the first element affects left bound, the second element affects right bound. If string, both sides are affected. Possible options: \"dirichlet\", nothing\n\nFields\n\na::Float64 – beginning of the support, matches the first element of the array knots\nb::Float64 – end of the support, matches the last element of the array knots\nknots::Array{Float64, 1} – array of points on which the spline is built\nbasis_functions::Array{BaseFunction, 1} – array of basis functions\n\n\n\n\n\n","category":"type"},{"location":"users_guide/#Legendre-polynomial-basis-1","page":"User's Guide","title":"Legendre polynomial basis","text":"","category":"section"},{"location":"users_guide/#","page":"User's Guide","title":"User's Guide","text":"LegendreBasis","category":"page"},{"location":"users_guide/#LegendreBasis","page":"User's Guide","title":"LegendreBasis","text":"Legendre polynomials basis with length n.\n\nConstructor\n\nLegendreBasis(a::Float64, b::Float64, n::Int64)\n\na, b – the beginning and the end of the support\n\nn – number of basis functions\n\nFields\n\na::Float64 – beginning of the support\nb::Float64 – end of the support\nbasis_functions::Array{BaseFunction, 1} – array of basis functions\n\n\n\n\n\n","category":"type"},{"location":"users_guide/#Bernstein-polynomial-basis-1","page":"User's Guide","title":"Bernstein polynomial basis","text":"","category":"section"},{"location":"users_guide/#","page":"User's Guide","title":"User's Guide","text":"BernsteinBasis","category":"page"},{"location":"users_guide/#BernsteinBasis","page":"User's Guide","title":"BernsteinBasis","text":"Bernstein polynomial basis.\n\nConstructor\n\nBernsteinBasis(\n    a::Float64, b::Float64, n::Int64,\n    boundary_condition::Union{Tuple{Union{String, Nothing}, Union{String, Nothing}}, Nothing, String}=nothing\n    )\n\na, b – the beginning and the end of the segment\n\nn – number of basis functions\n\nboundary_condition – boundary conditions of basis functions. If tuple, the first element affects left bound, the second element affects right bound. If string, both sides are affected. Possible options: \"dirichlet\", nothing.\n\nFields\n\na::Float64 – beginning of the support\nb::Float64 – end of the support\nbasis_functions::Array{BaseFunction, 1} – array of basis functions\nboundary_condition::Tuple{Union{String, Nothing}, Union{String, Nothing}} – boundary conditions of basis functions. If tuple, the first element affects left bound, the second element affects right bound. If string, both sides are affected. Possible options: \"dirichlet\", nothing.\n\n\n\n\n\n","category":"type"},{"location":"users_guide/#Model-1","page":"User's Guide","title":"Model","text":"","category":"section"},{"location":"users_guide/#","page":"User's Guide","title":"User's Guide","text":"GaussErrorMatrixUnfolder","category":"page"},{"location":"users_guide/#GaussErrorMatrixUnfolder","page":"User's Guide","title":"GaussErrorMatrixUnfolder","text":"Model for dicsrete data and kernel.\n\nConstructor\n\nGaussErrorMatrixUnfolder(\n    omegas::Array{Array{Float64, 2} ,1},\n    method::String=\"EmpiricalBayes\",\n    alphas::Union{Array{Float64, 1}, Nothing}=nothing,\n    )\n\nomegas – array of matrices that provide information about basis functions\n\nmethod – constant selection method, possible options: \"EmpiricalBayes\" and \"User\"\n\nalphas – array of constants, in case method=\"User\" should be provided by user\n\nFields\n\nomegas::Array{Array{Float64, 2} ,1}\nn::Int64 – size of square omega matrix\nmethod::String\nalphas::Union{Array{Float64}, Nothing}\n\n\n\n\n\n","category":"type"},{"location":"users_guide/#","page":"User's Guide","title":"User's Guide","text":"GaussErrorUnfolder","category":"page"},{"location":"users_guide/#GaussErrorUnfolder","page":"User's Guide","title":"GaussErrorUnfolder","text":"Model for continuous kernel. Data can be either discrete or continuous.\n\nConstructor\n\nGaussErrorUnfolder(\n    basis::Basis,\n    omegas::Array,\n    method::String=\"EmpiricalBayes\",\n    alphas::Union{Array{Float64, 1}, Nothing}=nothing,\n    )\n\nbasis – basis for reconstruction\n\nomegas – array of matrices that provide information about basis functions\n\nmethod – constant selection method, possible options: \"EmpiricalBayes\" and \"User\"\n\nalphas – array of constants, in case method=\"User\" should be provided by user\n\nFields\n\nbasis::Basis\nsolver::GaussErrorMatrixUnfolder\n\n\n\n\n\n","category":"type"},{"location":"users_guide/#Reconstruction-1","page":"User's Guide","title":"Reconstruction","text":"","category":"section"},{"location":"users_guide/#","page":"User's Guide","title":"User's Guide","text":"solve(\n    unfolder::GaussErrorMatrixUnfolder,\n    kernel::Array{Float64, 2},\n    data::Array{Float64, 1},\n    data_errors::Union{Array{Float64, 1}, Array{Float64, 2}},\n    )","category":"page"},{"location":"users_guide/#solve-Tuple{GaussErrorMatrixUnfolder,Array{Float64,2},Array{Float64,1},Union{Array{Float64,1}, Array{Float64,2}}}","page":"User's Guide","title":"solve","text":"solve(\n    unfolder::GaussErrorMatrixUnfolder,\n    kernel::Array{Float64, 2},\n    data::Array{Float64, 1},\n    data_errors::Union{Array{Float64, 1}, Array{Float64, 2}},\n    )\n\nArguments\n\nunfolder::GaussErrorMatrixUnfolder – model\nkernel::Array{Float64, 2} – discrete kernel\ndata::Array{Float64, 1} – function values\ndata_errors::Union{Array{Float64, 1}, Array{Float64, 2}} – function errors\n\nReturns: Dict{String, Array{Float64, 1}} with coefficients (\"coeff\"), errors (\"errors\") and optimal constants (\"alphas\").\n\n\n\n\n\n","category":"method"},{"location":"users_guide/#","page":"User's Guide","title":"User's Guide","text":"solve(\n    gausserrorunfolder::GaussErrorUnfolder,\n    kernel::Union{Function, Array{Float64, 2}},\n    data::Union{Function, Array{Float64, 1}},\n    data_errors::Union{Function, Array{Float64, 1}},\n    y::Union{Array{Float64, 1}, Nothing},\n    )","category":"page"},{"location":"users_guide/#solve-Tuple{GaussErrorUnfolder,Union{Array{Float64,2}, Function},Union{Array{Float64,1}, Function},Union{Array{Float64,1}, Function},Union{Nothing, Array{Float64,1}}}","page":"User's Guide","title":"solve","text":"solve(\n    gausserrorunfolder::GaussErrorUnfolder,\n    kernel::Union{Function, Array{Float64, 2}},\n    data::Union{Function, Array{Float64, 1}},\n    data_errors::Union{Function, Array{Float64, 1}},\n    y::Union{Array{Float64, 1}, Nothing},\n    )\n\nArguments\n\ngausserrorunfolder::GaussErrorUnfolder – model\nkernel::Union{Function, Array{Float64, 2}} – discrete or continuous kernel\ndata::Union{Function, Array{Float64, 1}} – function values\ndata_errors::Union{Function, Array{Float64, 1}} – function errors\ny::Union{Array{Float64, 1}, Nothing} – points to calculate function values and its errors (when data is given as a function)\n\nReturns: Dict{String, Array{Float64, 1}} with coefficients (\"coeff\"), errors (\"errors\") and optimal constants (\"alphas\").\n\n\n\n\n\n","category":"method"},{"location":"users_guide/#Result-1","page":"User's Guide","title":"Result","text":"","category":"section"},{"location":"users_guide/#","page":"User's Guide","title":"User's Guide","text":"PhiVec","category":"page"},{"location":"users_guide/#PhiVec","page":"User's Guide","title":"PhiVec","text":"Constructs solution function by coefficients, basis and errors.\n\nConstructor\n\nPhiVec(coeff::Array{Float64}, basis::Basis, errors::Array{Float64})\nPhiVec(coeff::Array{Float64}, basis::Basis)\nPhiVec(result::Dict{String, Array{Float64}}, basis::Basis)\n\nFields\n\ncoeff::Array{Float64} – coefficients of decomposition of a function in basis\nbasis::Basis – basis\nerrors::Union{Array{Float64}, Nothing} – coefficients of decomposition of a function errors in basis\n\n\n\n\n\n","category":"type"},{"location":"users_guide/#","page":"User's Guide","title":"User's Guide","text":"call(phivec::PhiVec, x::Float64)","category":"page"},{"location":"users_guide/#call-Tuple{PhiVec,Float64}","page":"User's Guide","title":"call","text":"call(phivec::PhiVec, x::Float64)\n\nArguments\n\nphivec::PhiVec – unfolded function\nx::Float64 – point to calculate the value of the function\n\nReturns: solution function value in given point.\n\n\n\n\n\n","category":"method"},{"location":"users_guide/#","page":"User's Guide","title":"User's Guide","text":"call(phivec::PhiVec, xs::Array{Float64, 1})","category":"page"},{"location":"users_guide/#call-Tuple{PhiVec,Array{Float64,1}}","page":"User's Guide","title":"call","text":"call(phivec::PhiVec, xs::Array{Float64, 1})\n\nArguments\n\nphivec::PhiVec – unfolded function\nxs::Array{Float64, 1} – points to calculate the value of the function\n\nReturns: solution function value in given points.\n\n\n\n\n\n","category":"method"},{"location":"users_guide/#","page":"User's Guide","title":"User's Guide","text":"errors(phi::PhiVec, x::Float64)","category":"page"},{"location":"users_guide/#errors-Tuple{PhiVec,Float64}","page":"User's Guide","title":"errors","text":"errors(phi::PhiVec, x::Float64)\n\nArguments\n\nphi::PhiVec – unfolded function\nx::Float64 – point to calculate the error of the function\n\nReturns: solution function error in given point x.\n\n\n\n\n\n","category":"method"},{"location":"users_guide/#","page":"User's Guide","title":"User's Guide","text":"errors(phi::PhiVec, xs::Array{Float64})","category":"page"},{"location":"users_guide/#errors-Tuple{PhiVec,Array{Float64,N} where N}","page":"User's Guide","title":"errors","text":"errors(phi::PhiVec, xs::Array{Float64})\n\nArguments\n\nphi::PhiVec – unfolded function\nxs::Array{Float64} – points to calculate the error of the function\n\nReturns: solution function error in given point x.\n\n\n\n\n\n","category":"method"},{"location":"examples/#Examples-1","page":"Examples","title":"Examples","text":"","category":"section"},{"location":"examples/#Reconstruction-of-the-sum-of-two-normal-distributions-with-discrete-kernel-in-basis-of-30-cubic-splines-with-zero-boundary-conditions.-1","page":"Examples","title":"Reconstruction of the sum of two normal distributions with discrete kernel in basis of 30 cubic splines with zero boundary conditions.","text":"","category":"section"},{"location":"examples/#","page":"Examples","title":"Examples","text":"Define the function","category":"page"},{"location":"examples/#","page":"Examples","title":"Examples","text":"using PyCall\ninclude(\"src/gauss_error.jl\")\ninclude(\"src/kernels.jl\")\na = 0.\nb = 6.\n\nfunction phi(x::Float64)\n    mu1 = 2.\n    mu2 = 4.\n    n1 = 4.\n    n2 = 2.\n    sig1 = 0.4\n    sig2 = 0.5\n\n    norm(n, mu, sig, x) = n / sqrt(2 * pi*sig^2) * exp(-(x - mu)^2 / (2 * sig^2))\n    return norm(n1, mu1, sig1, x) + norm(n2, mu2, sig2, x)\nend\n\nx = collect(range(a, stop=b, length=300))\n\nusing PyPlot\nmyplot = plot(x, phi.(x))","category":"page"},{"location":"examples/#","page":"Examples","title":"Examples","text":"(Image: function)","category":"page"},{"location":"examples/#","page":"Examples","title":"Examples","text":"Define kernel","category":"page"},{"location":"examples/#","page":"Examples","title":"Examples","text":"function kernel(x::Float64, y::Float64)\n    return getOpticsKernels(\"gaussian\")(x, y)\nend","category":"page"},{"location":"examples/#","page":"Examples","title":"Examples","text":"Integrate function multiplied by kernel and add noise","category":"page"},{"location":"examples/#","page":"Examples","title":"Examples","text":"convolution = y -> quadgk(x -> kernel(x,y) * phi(x), a, b, maxevals=10^7)[1]\ny = collect(range(a, stop = b, length=50))\nftrue = convolution.(y)\nsig = 0.05*abs.(ftrue) +[0.01 for i = 1:Base.length(ftrue)]\nusing Compat, Random, Distributions\nnoise = []\nfor sigma in sig\n    n = rand(Normal(0., sigma), 1)[1]\n    push!(noise, n)\nend\nf = ftrue + noise\nplot(y, f)","category":"page"},{"location":"examples/#","page":"Examples","title":"Examples","text":"(Image: integrated_function)","category":"page"},{"location":"examples/#","page":"Examples","title":"Examples","text":"Define basis","category":"page"},{"location":"examples/#","page":"Examples","title":"Examples","text":"basis = BernsteinBasis(a, b, 30, \"dirichlet\")\nfor basis_function in basis.basis_functions\n    plot(x, basis_function.f.(x))\nend","category":"page"},{"location":"examples/#","page":"Examples","title":"Examples","text":"(Image: basis)","category":"page"},{"location":"examples/#","page":"Examples","title":"Examples","text":"Discretize kernel","category":"page"},{"location":"examples/#","page":"Examples","title":"Examples","text":"Kmn = discretize_kernel(basis, kernel, y)","category":"page"},{"location":"examples/#","page":"Examples","title":"Examples","text":"Model","category":"page"},{"location":"examples/#","page":"Examples","title":"Examples","text":"","category":"page"},{"location":"examples/#","page":"Examples","title":"Examples","text":"Solve","category":"page"},{"location":"examples/#","page":"Examples","title":"Examples","text":"result = solve(model, Kmn, f, sig)","category":"page"},{"location":"examples/#","page":"Examples","title":"Examples","text":"Result","category":"page"},{"location":"examples/#","page":"Examples","title":"Examples","text":"phivec = PhiVec(result[\"coeff\"], basis, result[\"sig\"])\nx = collect(range(a, stop=b, length=5000))\nplot(x, phi.(x))\n\nphi_reconstructed = call(phivec, x)\nphi_reconstructed_errors = errors(phivec, x)\n\nplot(x, call(phivec, x))\nfill_between(x, phi_reconstructed - phi_reconstructed_errors, phi_reconstructed + phi_reconstructed_errors, alpha=0.3)\n","category":"page"},{"location":"examples/#","page":"Examples","title":"Examples","text":"(Image: result)","category":"page"}]
}
