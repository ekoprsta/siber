<template>
  <div>
    <SideBar />
    <div class="container-fluid">
      <main class="tm-main">
        <h2 class="tm-pt-30 tm-color-primary">
          Atendance Page
        </h2>
        <div style="display: flex;">
          <div class="row">
            <div class="card" style="width: 18rem; margin-right: 10px;" v-for="kelas in classes" :key="kelas.id">
              <div class="card-body">
                <h5 class="card-title">{{ kelas.className }}</h5>
                <p class="card-text">{{ kelas.pembicara }}</p>
                <p class="card-text">{{ kelas.classType }}</p>
                <p class="card-text">{{ kelas.date }}</p>
                <img :src="baseUrl + '/' + kelas.flyer" alt="" srcset="" width="80%">
                <form class="column align-items-center" @submit.prevent="handleAbsenSubmit(kelas.id)">
                  <select class="form-select form-select-lg btn-primary mb-3" aria-label="form-select-lg" @change="setHidden(kelas.id)" v-model="key[kelas.id]" style="width: 100%;">
                    <option selected>--- SELECT TYPE ---</option>
                    <option value="1">Absen Masuk</option>
                    <option value="2">Izin</option>
                  </select>
                  <br />
                  <textarea v-bind:id="kelas.id" style="display: none; width: 100%;" v-model="dataAbsen.remarks" placeholder="sebab izin"></textarea>
                  <br />
                  <button type="submit" class="btn btn-primary btn-lg">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import SideBar from '../components/SideBar.vue'
import Swal from 'sweetalert2'

export default {
  name: 'AbsenPage',
  components: {
    SideBar
  },
  data () {
    return {
      dataAbsen: {
        user: localStorage.getItem('email'),
        type: '',
        remarks: ''
      },
      key: [],
      isHidden: true
    }
  },
  created () {
    this.$store.dispatch('getClass')
  },
  mounted () {
  },
  methods: {
    setHidden (id) {
      if (this.key[id] === '2') {
        document.getElementById(id).style.display = 'block'
        this.dataAbsen.type = 'izin'
      } else {
        this.dataAbsen.type = 'hadir'
        document.getElementById(id).style.display = 'none'
        this.dataAbsen.remarks = null
      }
    },
    handleAbsenSubmit (id) {
      axios({
        url: 'http://localhost:3003/absen',
        method: 'POST',
        data: {
          email: this.dataAbsen.user,
          attendanceType: this.dataAbsen.type,
          remarks: this.dataAbsen.remarks,
          classId: id
        }
      })
        .then((response) => {
          console.log('berhasil')
          Swal.fire({
            icon: 'success',
            title: 'OK!',
            text: 'Data has been saved'
          })
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },
  computed: {
    classes () {
      return this.$store.state.classes
    },
    baseUrl () {
      return this.$store.state.baseUrl
    }
  }
}
</script>

<style>
.card {
  margin-bottom: 10px;
}
</style>
