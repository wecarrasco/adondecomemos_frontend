<template>
  <div>
    <div class="navbar-fixed">
        <nav>
            <div class="nav-wrapper grey lighten-1">
                <img src="./assets/LogoDondeComemosSF.png" class="brand-logo" style="height: 85px; margin-top: 10px; margin-left: 10px;">
                <ul class="right hide-on-med-and-down">
                    <li><a class="waves-effect waves-dark btn">¿Quienes Somos?</a></li>
                    <li><a class="waves-effect waves-dark btn">Iniciar Sesion<i class="material-icons right">account_circle</i></a></li>
                </ul>
            </div>
        </nav>
    </div>
    <div class="section light-green lighten-3 valign-wrapper" id="seccion_initial" >
        <div class="container hazed center-align">
            <h3>¿Quieres comer algo nuevo hoy? ¿Conocer gastronomías extranjeras? #DondeComemos te puede ayudar, poniendo estas opciones a tu alcance.</h3>
            <div class="row">
                <div class="col s10">
                    <form class="input-field">
                        <input id="search" type="search" required>
                        <label for="search" >¿De que tienes antojo?</label>
                    </form>
                </div>
                <div class="col s2">
                    <a class="btn-floating btn-large waves-effect waves-dark"><i class="material-icons">search</i></a>
                </div>
            </div>
        </div>
    </div>
    <div class="section valign-wrapper" id="seccion_trending">
        <div class="container valign-wrapper">
            <div class="./assets/carousel carousel-slider center" data-indicators="true" style="height: 370px;">
                <div class="carousel-item red white-text row" href="#one!">
                    <div class="col s8">
                        <img src="./assets/CaruselFood.jpg" class="responsive-img"/>
                    </div>
                    <div class="col s4">
                        <h1>Comidas Trending</h1>
                        <ol>
                            <li>Trending 1</li>
                            <li>Trending 2</li>
                            <li>Trending 3</li>
                        </ol>
                    </div>
                </div>
                <div class="carousel-item amber white-text row" href="#two!">
                    <div class="col s8">
                        <img src="./assets/CaruselDesserts.jpg" class="responsive-img"/>
                    </div>
                    <div class="col s4">
                        <h1>Postres Trending</h1>
                        <ol>
                            <li>Trending 1</li>
                            <li>Trending 2</li>
                            <li>Trending 3</li>
                        </ol>
                    </div>
                </div>
                <div class="carousel-item green white-text row" href="#three!">
                    <div class="col s8">
                        <img src="./assets/CaruselBebidas.jpg" class="responsive-img"/>
                    </div>
                    <div class="col s4">
                        <h1>Bebidas Trending</h1>
                        <ol>
                            <li>Trending 1</li>
                            <li>Trending 2</li>
                            <li>Trending 3</li>
                        </ol>
                    </div>
                </div>
              </div>
        </div>
    </div>
    <div class="section valign-wrapper" id="seccion_descarga">
        <div class="container">
            <div class="row">
                <div class="col s8 center-align">
                    <h1>Descarga la App</h1>
                    <div class="row">
                        <div class="col s6">
                            <a class="waves-effect waves-dark btn-large"><i class="fa fa-apple left" aria-hidden="true"></i>App Store</a>
                        </div>
                        <div class="col s6">
                            <a class="waves-effect waves-dark btn-large"><i class="material-icons left">android</i>Play Store</a>
                        </div>
                    </div>
                    <div class="row center-align" id="comentariosApp">
                        <h5 style="margin-top: 60px;">"Esta app está genial" - Jeff</h5>
                    </div>
                </div>
                <div class="col s4">
                    <img src="landingDescarga.jpg" class="responsive-img"/>
                </div>
            </div>
        </div>
    </div>
    <div class="section valign-wrapper" id="seccion_registro">
        <div class="container center-align hazed">
            <h3>¿Quieres que tu restaurante sea parte de nuestra red?</h3>
            <div class="row">
                <form>
                    <div class="col s5">
                         <div class="input-field col s12">
                             <input id="email" type="email" class="validate">
                             <label for="email" data-error="wrong" data-success="right">Correo</label>
                        </div>
                    </div>
                    <div class="col s4">
                         <div class="input-field col s12">
                             <input id="phone_number" type="text" class="validate">
                             <label for="phone_number">Numero de Telefono</label>
                        </div>
                    </div>
                </form>
                <div class="col s3">
                    <a class="waves-effect waves-dark btn-large">Registrate</a>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
//import Materials from 'Materials'
export default {
  data(){
    return{
      user:{
        email:""
      }
    }
  },
  methods:{
    clickSuscribe: function(){
        this.$http.post("http://localhost:8000/dc/suscribe/", this.user).then((res)=>{
          if (res.body.success === true) {
            alert("true");
          }else{
            alert("false");
          }
        });
    }
  }
}
</script>

<style lang="css">
.body {
  height: 100%;
}
.nav-wrapper {
  height: 15vh !important;
}
#seccion_initial {
  margin-top: 6vh;
  background-image: url("./assets/initialBg.jpg");
  background-size: cover;
}
#seccion_trending {
  background-color: #CD6720;
}
#seccion_descarga{
  background-color: #06cc97;
}
#seccion_registro {
  background-image: url("./assets/landingRegistro.jpg");
  background-size: cover;
}
.section {
  height: 85vh;
}
#comentariosApp {
  background-color:
}
.carousel.carousel-slider .carousel-item {
  height: 64%;
  min-height: 0px;
}
.btn, .btn-large{
  background-color: #CD6720;
}
.hazed {
  background-color: rgba(190,186,186,0.6);
}
</style>
