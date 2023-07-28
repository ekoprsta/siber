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
              v-model="this.$store.state.classEdit.className"
              type="text"
              placeholder="Enter class Subject"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group id="input-group-2" label="Pembicara :" label-for="input-2">
            <b-form-input
              id="input-2"
              v-model="this.$store.state.classEdit.pembicara"
              placeholder="Nama Pembicara"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group id="input-group-3" label="Jenis Kelas:" label-for="input-3">
            <b-form-select
              id="input-3"
              v-model="this.$store.state.classEdit.classType"
              :options="classes"
              required
            ></b-form-select>
          </b-form-group>
          <b-form-group id="input-group-4" label="Tanggal :" label-for="input-4">
            <b-form-input
              id="input-4"
              type="date"
              v-model="this.$store.state.classEdit.date"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group id="input-group-5" label="Waktu :" label-for="input-5">
            <b-form-input
              id="input-5"
              type="time"
              v-model="this.$store.state.classEdit.time"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group id="input-group-6" label="Flyer :" label-for="image">
            <b-form-file
              id="image"
              name="image"
              type="file"
              @change="uploadFlyer"
              placeholder="Choose a image (.jpg, .png or .gif) file or drop it here..."
              drop-placeholder="Drop file here..."
              accept=".jpg, .png, .gif"
              required
            ></b-form-file>
          </b-form-group>
          <b-button type="submit" variant="primary">Submit</b-button>
          <b-button type="reset" variant="danger">Reset</b-button>
        </b-form>
        <b-card class="mt-3" header="Form Data Result">
          <pre class="m-0">{{ form }}</pre>
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
  name: 'CreateClassPage',
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
      classEdit: this.$store.state.classEdit,
      image: null,
      classes: [{ text: 'Select One', value: null }, 'Kelas Utama', 'Dinamika Kelompok'],
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
      this.image = event.target.files[0]
      this.form.flyer = event.target.files[0].name
      console.log(this.image, '<<<<<<')
      console.log(window.location.origin)
    },
    onSubmitEditClass () {
      // const dataForm = JSON.stringify(this.form)
      const formData = new FormData()
      formData.append('image', this.image)
      for (var key in this.form) {
        formData.append(key, this.form[key])
      }
      axios({
        url: 'http://localhost:3003/createClass',
        method: 'POST',
        data: formData
      })
        .then((response) => {
          this.form.className = ''
          this.form.pembicara = ''
          this.form.date = ''
          this.form.time = ''
          this.form.classType = null
          this.image = null
          Swal.fire({
            icon: 'success',
            title: 'OK!',
            text: 'Class has been created'
          })
        })
        .catch((error) => {
          console.log(error)
          this.form.className = ''
          this.form.pembicara = ''
          this.form.date = ''
          this.form.classType = null
          this.image = null
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
    }
  },
  created () {
    console.log(this.$route.params.id, '<<paramsId')
    this.$store.dispatch('getClassById', this.$route.params.id)
    this.$store.state.classEdit.date = new Date(this.$store.state.classEdit.date).toLocaleDateString('en-CA')
  }
}
</script>

<style>

</style>
