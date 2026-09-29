<template>
  <div class="page">
    <div class="card">
      <!-- LOGO -->
      <img class="logo" src="@/assets/img/nlogo.png" alt="Municipalidad Provincial de Cajamarca" />

      <!-- TÍTULO -->
      <div class="titulo">
        CONSULTA TUS<br />
        COMPROBANTES
      </div>

      <!-- ERROR -->
      <template v-if="error">
        <div class="error-box">
          <h3>{{ error }}</h3>

          <p v-if="vigenteHasta">Vigente hasta: {{ vigenteHasta }}</p>
        </div>
      </template>

      <!-- COMPROBANTE -->
      <template v-else-if="comprobante">
        <!-- ICONO DOCUMENTO -->
        <div class="documento">
          <div class="documento-icono">
            <div class="linea"></div>
            <div class="linea"></div>
            <div class="linea"></div>
            <div class="linea corta"></div>
          </div>
        </div>

        <!-- NÚMERO -->
        <h2 class="numero">{{ comprobante.serie }}-{{ comprobante.numero }}</h2>

        <!-- DETALLE -->
        <div class="detalle">
          <div class="fila">
            <span>Tipo</span>

            <strong> {{ comprobante.tipo }} ELECTRÓNICA </strong>
          </div>

          <div class="fila">
            <span>Estado</span>

            <span class="badge">
              {{ comprobante.estado }}
            </span>
          </div>

          <div class="fila">
            <span>Fecha Emisión</span>
            <div class="numero">
              <strong>
                {{ comprobante.fecha_emision }}
              </strong>
            </div>
          </div>

          <div class="fila">
            <span>Consultar hasta</span>
            <div class="numero">
              <strong>
                {{ comprobante.vigente_hasta }}
              </strong>
            </div>
          </div>
        </div>

        <!-- BOTÓN PDF -->
        <button class="btn-descargar" @click="descargarPdf">📥 Descargar PDF</button>
      </template>

      <!-- LOADING -->
      <template v-else>
        <div class="loading">Cargando comprobante...</div>
      </template>
    </div>
  </div>
</template>


<script>
import api from '../services/api.js'

export default {
  data() {
    return {
      comprobante: null,
      error: null,
      vigenteHasta: null,
    }
  },

  async created() {
    try {
      const response = await api.getComprobante(this.$route.params.hash)

      this.comprobante = response
      this.vigenteHasta = response.vigente_hasta
    } catch (err) {
      if (err.response && err.response.status === 410) {
        this.error = err.response.data.error
        this.vigenteHasta = err.response.data.vigente_hasta
      } else if (err.response && err.response.status === 404) {
        this.error = 'El comprobante no existe o el archivo PDF no está disponible'
      } else {
        this.error = 'No se pudo cargar el comprobante'
      }
    }
  },

  methods: {
    descargarPdf() {
      if (this.comprobante?.pdf_url) {
        window.open(this.comprobante.pdf_url, '_blank')
      }
    },
  },
}
</script>


<style scoped>
/* =========================================
   PÁGINA
========================================= */

.page {
  min-height: 100vh;
  background: #f1f2f3;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 20px;
  box-sizing: border-box;
}

/* =========================================
   TARJETA PRINCIPAL
========================================= */

.card {
  width: 100%;
  max-width: 450px;

  background: #ffffff;

  border-radius: 12px;

  padding: 18px 34px 22px;

  box-sizing: border-box;

  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

/* =========================================
   LOGO
========================================= */

.logo {
  display: block;

  width: 225px;
  max-width: 100%;

  margin: 0 auto 12px;
}

/* =========================================
   TÍTULO
========================================= */

.titulo {
  width: 192px;

  margin: 0 auto 20px;

  padding: 8px 10px;

  box-sizing: border-box;

  background: #b9f3f6;

  color: #1f42ff;

  text-align: center;

  font-family: Georgia, 'Times New Roman', serif;

  font-size: 18px;

  font-style: italic;

  font-weight: bold;

  line-height: 1.25;

  border-radius: 5px;
}

/* =========================================
   DOCUMENTO
========================================= */

.documento {
  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: 8px;
}

.documento-icono {
  width: 28px;
  height: 38px;

  border: 2px solid #111;

  background: white;

  position: relative;

  box-sizing: border-box;
}

/* Esquina doblada */

.documento-icono::after {
  content: '';

  position: absolute;

  top: -2px;
  right: -2px;

  width: 10px;
  height: 10px;

  background: white;

  border-left: 2px solid #111;
  border-bottom: 2px solid #111;
}

/* Líneas del documento */

.linea {
  position: relative;

  height: 1px;

  background: #999;

  margin: 7px 5px 0;
}

.linea.corta {
  width: 12px;
}

/* =========================================
   NÚMERO
========================================= */

.numero {
  text-align: center;

  margin: 8px 0 18px;

  color: #111;

  font-family: Georgia, 'Times New Roman', serif;

  font-size: 18px;

  font-weight: bold;
}

/* =========================================
   DETALLE
========================================= */

.detalle {
  margin-bottom: 18px;
}

.fila {
  display: flex;

  justify-content: space-between;
  align-items: center;

  min-height: 34px;

  padding: 7px 0;

  border-bottom: 1px solid #dedede;

  box-sizing: border-box;

  /* font-family: Georgia, 'Times New Roman', serif; */

  font-size: 13px;
}

.fila > span:first-child {
  color: #536b87;
}

.fila strong {
  color: #000;

  font-weight: normal;

  text-align: right;
}

/* =========================================
   ESTADO
========================================= */

.badge {
  background: #d5f8e4;

  color: #168447;

  padding: 3px 9px;

  border-radius: 12px;

  font-family: Arial, sans-serif;

  font-size: 10px;

  font-weight: normal;
}

/* =========================================
   BOTÓN DESCARGAR
========================================= */

.btn-descargar {
  width: 100%;

  background: #0869e8;

  color: white;

  border: none;

  border-radius: 7px;

  padding: 11px 15px;

  font-family: Arial, sans-serif;

  font-size: 13px;

  font-weight: bold;

  cursor: pointer;

  transition: background 0.2s ease;
}

.btn-descargar:hover {
  background: #075bc9;
}

.btn-descargar:active {
  transform: scale(0.99);
}

/* =========================================
   ERROR
========================================= */

.error-box {
  text-align: center;

  padding: 20px 5px;

  color: #dc3545;

  font-family: Arial, sans-serif;
}

.error-box h3 {
  font-size: 16px;

  margin-bottom: 10px;
}

.error-box p {
  font-size: 13px;
}

/* =========================================
   LOADING
========================================= */

.loading {
  text-align: center;

  padding: 30px 10px;

  color: #666;

  font-family: Arial, sans-serif;

  font-size: 14px;
}

/* =========================================
   RESPONSIVE
========================================= */

@media (max-width: 480px) {
  .page {
    padding: 12px;
  }

  .card {
    padding: 16px 22px 20px;
  }

  .logo {
    width: 210px;
  }

  .titulo {
    width: 190px;
    font-size: 17px;
  }

  .fila {
    font-size: 12px;
  }
}
</style>
