<template>
  <div class="cuerpo">
    <nav class="navbar navbar-inverse">
      <div class="container-fluid">
        <div class="navbar-header">
          <a href="" class="navbar-brand">¿Dónde Comemos?</a>
        </div>
        <form class="navbar-form navbar-center" role="search">
          <div class="form-group">
            <input v-model="filtro_busqueda" type="text" class="form-control barra barra-cerrada barra-principal" placeholder="Search">
            <button v-on:click="buscar" type="submit" class="btn btn-default boton-search">
              <i class="fa fa-search" aria-hidden="true"></i>
            </button>
            <button class="btn btn-default boton-search-avanzado">
              <i class="fa fa-chevron-down" aria-hidden="true"></i>
            </button>
          </div>
          <br>
          <div class="grupo2 form-group">
            <input type='text' class='form-control barra input-presupuesto barra-cerrada' placeholder='Presupuesto'>
            <div class="grupo-extra">
              <input type='text' class='form-control barra input-presupuesto barra-cerrada' placeholder='Ubicación'>
              <button class="btn btn-default boton-gps">
                <i class="fa fa-map-marker" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        </form>
      </div>
    </nav>

    <div class="div-mapa" id="basic_map"></div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      marcadores: [],
      map,
      filtro_busqueda: null
    }
  },methods:{
    simon:function(){
      alert("simon")
    },
    traerRestaurantes:function(){
      this.$http.get("http://localhost:8000/marcadores/restaurantes").then((res)=>{
        var restaurantes = res.body;
        for (var i = 0; i < restaurantes.length; i++) {
          var direcciones = restaurantes[i].Direcciones;
          let nombre = restaurantes[i].Nombre;
          for (var j = 0; j < direcciones.length; j++) {
            this.$http.get("http://localhost:8000/marcadores/direcciones?id="+direcciones[j]).then((res)=>{
              var dir = res.body;
              for (var k = 0; k < dir.length; k++) {
                let lati = dir[k].Latitud;
                let lon = dir[k].Longitud;
                this.mapa.addMarker({
                  lat: lati,
                  lng: lon,
                  title: nombre
                });
              }
            });

          }
        }
      });
    },
    buscar:function(event){
      let _this = this;
      _this.mapa.removeMarkers();
      GMaps.geolocate({
        success: function(position){
            _this.mapa.setCenter(position.coords.latitude, position.coords.longitude);
            _this.mapa.addMarker({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            title: "You",
            icon: "src/assets/marker_you.png"
          })
        },error: function(error) {
          alert('Geolocation failed: '+error.message);
        },not_supported: function() {
          alert("Your browser does not support geolocation");
        }
      });

      this.$http.get("http://localhost:8000/marcadores/restaurantes").then((res)=>{
        var restaurantes = res.body;
        for (var i = 0; i < restaurantes.length; i++) {
          var direcciones = restaurantes[i].Direcciones;
          let nombre = restaurantes[i].Nombre;
          let stringTags = "";
          let tags = restaurantes[i].Tags;
          if (typeof tags !== "undefined") {
            for (var l = 0; l < tags.length; l++) {
              stringTags += tags[l];
            }
          }
          stringTags += nombre
          if (stringTags.toUpperCase().indexOf(_this.filtro_busqueda.toUpperCase()) > -1) {
            for (var j = 0; j < direcciones.length; j++) {
              this.$http.get("http://localhost:8000/marcadores/direcciones?id="+direcciones[j]).then((res)=>{
                var dir = res.body;
                for (var k = 0; k < dir.length; k++) {
                  let lati = dir[k].Latitud;
                  let lon = dir[k].Longitud;
                  this.mapa.addMarker({
                    lat: lati,
                    lng: lon,
                    title: nombre
                  });
                }
              });
            }
          }
        }
      });

    }
  },mounted(){
    var _this = this;
    var mapaThis = _this.mapa;

    _this.mapa = new GMaps({
      el: '#basic_map',
      lat: 51.5073346,
      lng: -0.1276831,
      zoom: 16,
      zoomControl : true,
      zoomControlOpt: {
        style : 'SMALL',
        position: 'TOP_LEFT'
      },
      panControl : false,
      styles: [
        {
          "featureType": "poi.attraction",
          "stylers": [{"visibility": "off"}]
        },
        {
          "featureType": "poi.business",
          "stylers": [{"visibility": "off"}]
        },
        {
          "featureType": "poi.government",
          "stylers": [{"visibility": "off"}]
        },
        {
          "featureType": "poi.medical",
          "stylers": [{"visibility": "off"}]
        },
        {
          "featureType": "poi.place_of_worship",
          "stylers": [{"visibility": "off"}]
        },
        {
          "featureType": "poi.school",
          "stylers": [{"visibility": "on"}]
        },
        {
          "featureType": "poi.sports_complex",
          "stylers": [{"visibility": "off"}]
        }
      ]
    });

    GMaps.geolocate({
      success: function(position){
          _this.mapa.setCenter(position.coords.latitude, position.coords.longitude);
          _this.mapa.addMarker({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          title: "You",
          icon: "src/assets/marker_you.png"
        })
      },error: function(error) {
        alert('Geolocation failed: '+error.message);
      },not_supported: function() {
        alert("Your browser does not support geolocation");
      }
    });

    _this.traerRestaurantes();
    $(document).ready(function(){
      //size del mapa relativo al navbar
      let navSize = $(".navbar").height();
      $(".div-mapa").css("height", "100vh").css("height", "-="+navSize);

      let barras = document.getElementsByClassName("barra");
      let avanzado = false;
      $(".boton-search-avanzado").click(function(){
        if (avanzado === false) {
          for (var i = 0; i < barras.length; i++) {
            $(barras[i]).animate({width: '+=380px'}, 300);
          }
          $(".navbar").animate({height: '+=80px'}, 200);
          $(".input-presupuesto").css("visibility","visible");
        }else if(avanzado === true){
          for (var i = 0; i < barras.length; i++) {
            $(barras[i]).animate({width: '-=380px'}, 300);
          }
          $(".navbar").animate({height: '-=80px'}, 200);
          $(".input-presupuesto").css("visibility","hidden");
        };
        avanzado = !avanzado;
      });

      let searchClick = false;
      $(".barra-principal").focusin(function(){
        if (avanzado === false && searchClick === false) {
          $(".barra-principal").animate({width: '+=380px'}, 300);
        }
        searchClick = !searchClick;
      });

      $(".barra-principal").focusout(function(){
        if (avanzado === false && searchClick === true) {
          $(".barra-principal").animate({width: '-=380px'}, 300);
        }
        searchClick = !searchClick;
      });


      $(window).resize(function() {
        //console.log("simon")
        google.maps.event.trigger(_this.mapa, 'resize');
        let navSize = $(".navbar").height();
        $(".div-mapa").css("height", "100vh").css("height", "-="+navSize);
      });
      google.maps.event.trigger(_this.mapa, 'resize');
    });
  }
};
</script>

<style lang="css">

.div-mapa{
  height: 100vh;
}

.cuerpo{
  overflow: hidden;
  height: 100%;
  min-height: 100%;
}

.navbar-center {
  position: absolute;
  left: 50%;
  transform: translatex(-50%);
  display: block !important;
}

input.barra{
  padding-left: 15px;
  width: 50%;
}

.navbar{
  height: 100%;
  margin-bottom: 0;
}

.input-presupuesto{
  visibility: hidden;
}


</style>
