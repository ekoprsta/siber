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
                <div style="float: right;" v-if="isAdmin">
                  <a href="" @click.prevent="editClass(kelas.id)"><img src="assets/img/edit.png" alt="" height="18" width="18" style="padding: 2px;"></a>
                  <a href="" @click.prevent="deleteClass(kelas.id)"><img src="assets/img/delete.png" alt="" height="20" width="20" style="padding: 2px;"></a>
                </div>
                <h5 class="card-title">{{ kelas.className }}</h5>
                <p class="card-text">{{ kelas.pembicara }}</p>
                <p class="card-text">{{ kelas.classType }}</p>
                <p class="card-text">{{ new Date(kelas.date).toLocaleDateString('en-gb',{ year: 'numeric', month: 'long', day: 'numeric', timeZone:'utc'}) }} {{ kelas.time }} WIB</p>
                <img :src="baseUrl + '/' + kelas.flyer" alt="" srcset="" width="80%">
                <form class="column align-items-center" @submit.prevent="handleAbsenSubmit(kelas.id)" v-if="!isAdmin">
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
                <br />
                <br />
                <button @click.prevent="activeClass(kelas.id)" type="submit" class="btn btn-secondary btn-lg" v-if="kelas.status=='Not Active' && isAdmin">
                    Active Class
                </button>
                <p class="card-text" style="font-size: 12px;" v-if="kelas.status=='active' && isAdmin">Clas Activated on {{ new Date(kelas.updatedAt).toLocaleDateString('en-gb',{ year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'}) }} </p>
                <p v-if="kelas.status=='active' && isAdmin"><b> <i> Secret code : {{ kelas.classCode }} </i></b></p>
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
      isHidden: true,
      isAdmin: false,
      kodeKelas: ''
    }
  },
  created () {
    this.$store.dispatch('getClass')
    if (localStorage.getItem('role') === 'Admin') {
      this.isAdmin = true
    } else {
      this.isAdmin = false
    }
  },
  mounted () {
  },
  methods: {
    async setHidden (id) {
      if (this.key[id] === '2') {
        document.getElementById(id).style.display = 'block'
        this.dataAbsen.type = 'izin'
      } else {
        this.dataAbsen.type = 'hadir'
        document.getElementById(id).style.display = 'none'
        this.dataAbsen.remarks = null
      }
    },
    async handleAbsenSubmit (id) {
      console.log(id, '<<ID')
      await this.$store.dispatch('getClassById', id)
      if (this.dataAbsen.type === 'hadir') {
        const { value: password } = await Swal.fire({
          input: 'text',
          inputLabel: 'Class Code',
          inputPlaceholder: 'Enter class code',
          showCancelButton: true,
          inputValidator: (value) => {
            if (value !== this.$store.state.classEdit.classCode) {
              return 'You entered wrong class code'
            }
          },
          inputAttributes: {
            maxlength: 10,
            autocapitalize: 'off',
            autocorrect: 'off'
          }
        })

        if (password) {
          axios({
            url: 'http://localhost:3003/absen',
            method: 'POST',
            headers: { accesstoken: localStorage.getItem('accesstoken') },
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
      }
    },
    deleteClass (id) {
      console.log(id, '<<id')
      axios({
        url: `http://localhost:3003/class/${id}`,
        method: 'DELETE',
        headers: {
          accesstoken: localStorage.getItem('accesstoken')
        }
      })
        .then((response) => {
          this.$store.dispatch('getClass')
        })
        .catch((error) => {
          console.log(error)
        })
    },
    editClass (id) {
      this.$router.push({ name: 'EditClass', params: { id } }).catch(() => {})
    },
    activeClass (id) {
      console.log(id, '<<<ID')
      axios({
        url: `http://localhost:3003/activeClass/${id}`,
        method: 'PUT',
        headers: {
          accesstoken: localStorage.getItem('accesstoken')
        }
      })
        .then((response) => {
          this.$store.dispatch('getClass')
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
    },
    classEditss () {
      return this.$store.state.classEdit
    }
  }
}
</script>

<style>
.card {
  margin-bottom: 10px;
}
</style>
