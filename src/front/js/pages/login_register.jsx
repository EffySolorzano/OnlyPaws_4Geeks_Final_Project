const { Button } = require("bootstrap")

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login Onlypaws</title>
    <link href="bootstrap.min.css" rel="stylesheet">

        <style>
            body{
            background: #ffe259
            background: linear-gradient(to rigth, #ffa7521, #ffe259)
            }
            .bg{
            background-image: url(img/paseador.jpg);
            background-position: center center;
            }

        </style>
</head>

<body>

<div class="container w-75 bg primary mt-5 rounded shadow">
<div class="row align-items-stretch"> 
<div class="col bg d-none d-lg-block col-md-5 col-lg-5 col-xl-6 rounded">

</div>
<div class="col bg-white p-5 rounded-end">
    <div class="text-end">
        <img src="img/onlypaws2.0.png" widh="48" alt="">
    </div>
    <h2 class="fw-bold text-center py-5">Bienvenido</h2>
    
    <form action="#">
        <div class="mb-4">
            <label for="email" class="form-label">Correo electrónico</label>
            <input type="email" class="form-control" name="email"/>
        </div>
        <div class="mb-4">
        <label for="password" class="form-label">Password</label>
        <input type="password" class="form-control" name="password"/>
        </div>
        <div class="mb-4 form-check">
            <input type="checkbox" name="connected" class="form-check-input"/>
            <label for="connected" class="form-check-label">Permanecer conectado</label>
        </div>

        <div class="d-grid">
            <button type="submit" class="btn btn-primary">Iniciar Sesión</button>
             </div>

             <div class="my-3">
                <span>No tienes cuenta? <a href="#"></a></span> <br></br>
                <span><a href="#">Recuperar Password</a></span>
             </div>
         </form>

    <div class="container w-100 my-5">
        <div class="row text-center">
            <div class="col-12">Iniciar Sesión</div>
        </div>
        <div className="row">
            <div className="col">
                <button class="btn btn-outline-primary w-100 my-1">
                    <div class="row align-items-center">
                        <div class ="col-2 d-none d-md-block">
                            <img src="img/facebook.jpg" width="32" alt="" />
                        </div>


                        <div class="col-12 col-md-10 text-center">
                            Facebook
                        </div>
                    </div>

                </button>
            </div>
            <div className="col"></div>
            <button class="btn btn-outline-danger w-100 my-1">
                    <div class="row align-items-center">
                        <div class ="col-2 d-none d-md-block">
                            <img src="img/gmail.jpg" width="32" alt="" />
                        </div>
                        <div class="col-12 col-md-10 text-center">
                            Google
                        </div>
                    </div>

                </button>
        </div>
    </div>
      </div>
    </div>
   </div>


    <script src="bootstrap.bundle.min.js"></script>
</body>
</html>