<template>
  <div>
    <SideBar></SideBar>
    <div class="container-fluid">
      <main class="tm-main">
        Edit Class
        <br />
        <br />
        <b-form @submit.prevent="onSubmitEditClass" @reset.prevent="onResetClass" v-if="show" enctype="multipart/form-data">
          <b-form-group
            id="input-group-1"
            label="Tema Perkuliahan:"
            label-for="input-1"
            description="Tema perkuliaha yang akan dibuat."
          >
            <b-form-input
              id="input-1"
              v-model="$store.state.classEdit.className"
              type="text"
              placeholder="Enter class Subject"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group id="input-group-2" label="Pembicara :" label-for="input-2">
            <b-form-input
              id="input-2"
              v-model="$store.state.classEdit.pembicara"
              placeholder="Nama Pembicara"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group id="input-group-3" label="Jenis Kelas:" label-for="input-3">
            <b-form-select
              id="input-3"
              v-model="$store.state.classEdit.classType"
              :options="classesEdit"
              required
            ></b-form-select>
          </b-form-group>
          <b-form-group id="input-group-4" label="Tanggal :" label-for="input-4">
            <b-form-input
              id="input-4"
              type="date"
              v-model="$store.state.classEdit.date"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group id="input-group-5" label="Waktu :" label-for="input-5">
            <b-form-input
              id="input-5"
              type="time"
              v-model="$store.state.classEdit.time"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group id="input-group-6" label="Flyer :" label-for="image">
            <img id="flyerEdit" :src="baseUrl + '/' + $store.state.classEdit.flyer" alt="" srcset="" width="30%" height="30%">
            <b-form-file
              id="image"
              name="image"
              type="file"
              @change="uploadFlyer"
              placeholder="Choose a image (.jpg, .png or .gif) file to edit flyer"
              drop-placeholder="Drop file here..."
              accept=".jpg, .png, .gif"
            ></b-form-file>
          </b-form-group>
          <b-button type="submit" variant="primary">Submit</b-button>
          <b-button type="reset" variant="danger">Reset</b-button>
        </b-form>
        <b-card class="mt-3" header="Form Data Result">
          <pre class="m-0">{{ $store.state.classEdit }}</pre>
        </b-card>
      </main>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
import SideBar from '../components/SideBar.vue'

export default {
  name: 'EditClass',
  components: {
    SideBar
  },
  data () {
    return {
      form: {
        className: '',
        pembicara: '',
        date: '',
        classType: null,
        time: null,
        flyer: null
      },
      imageEdit: null,
      classesEdit: [{ text: 'Select One', value: null }, 'Kelas Utama', 'Dinamika Kelompok'],
      show: true
    }
  },
  methods: {
    onResetClass () {
    // Reset our form values
      this.form.className = ''
      this.form.pembicara = ''
      this.form.date = ''
      this.form.time = ''
      this.form.classType = null
      this.image = null
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },
    uploadFlyer (event) {
      console.log(event, '<<<<eventuploadfile')
      this.imageEdit = event.target.files[0]
      document.getElementById('flyerEdit').style.display = 'none'
      this.$store.state.classEdit.flyer = event.target.files[0].name
    },
    onSubmitEditClass (id) {
      id = this.$route.params.id
      const formDataEdit = new FormData()
      formDataEdit.append('image', this.imageEdit)
      console.log(this.$store.state.classEdit, '<<<<<>>>>')
      for (var key in this.$store.state.classEdit) {
        formDataEdit.append(key, this.$store.state.classEdit[key])
      }
      console.log(formDataEdit, '<<formDataEdit')
      axios({
        url: `http://localhost:3003/class/${id}`,
        method: 'PUT',
        data: formDataEdit,
        headers: {
          accesstoken: localStorage.getItem('accesstoken')
        }
      })
        .then((response) => {
          Swal.fire({
            icon: 'success',
            title: 'OK!',
            text: 'Data has been saved'
          })
          this.$router.push({ name: 'AbsenPage' }).catch(() => {})
        })
        .catch((error) => {
          console.log(error)
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something wrong, please check your data!'
          })
        })
    }
  },
  computed: {
    classById () {
      return this.$store.state.classEdit
    },
    baseUrl () {
      return this.$store.state.baseUrl
    }
  },
  created () {
    this.$store.dispatch('getClassById', this.$route.params.id)
  }
}
</script>

<style>

</style>
