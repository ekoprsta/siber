<template>
  <header class="tm-header" id="tm-header">
    <div class="tm-header-wrapper">
      <button
        class="navbar-toggler"
        type="button"
        aria-label="Toggle navigation"
      >
        <font-awesome-icon icon="fa-solid fa-bars" />
      </button>
      <div class="tm-site-header">
        <div class="mb-3 mx-auto tm-site-logo">
          <font-awesome-icon icon="fa-solid fa-book-open" />
        </div>
        <h1 class="text-center">S I B E R</h1>
        <h4 class="text-center">Sistem Informasi Bidang Pendidikan RISKA</h4>
      </div>
      <nav class="tm-nav" id="tm-nav">
        <ul>
          <li class="tm-nav-item">
            <a href="#" @click.prevent="backToHome" class="tm-nav-link">
              <font-awesome-icon icon="fa-solid fa-house" />
              Home
            </a>
          </li>
          <li class="tm-nav-item">
            <a href="#" class="tm-nav-link" @click.prevent="goToAbsenPage">
              <font-awesome-icon icon="fa-solid fa-pen" />
              Absen
            </a>
          </li>
          <li class="tm-nav-item" v-if="isAdmin">
            <a href="#" class="tm-nav-link" @click.prevent="goToCreateClass">
              <font-awesome-icon icon="fa-solid fa-pen" />
              Class
            </a>
          </li>

          <li class="tm-nav-item">
            <a href="#" class="tm-nav-link" @click.prevent="handleLogout">
              <font-awesome-icon icon="fa-solid fa-right-from-bracket" />
              Log Out
            </a>
          </li>
        </ul>
      </nav>
      <div class="tm-mb-65">
        <a
          rel="nofollow"
          href="https://fb.com/templatemo"
          class="tm-social-link"
        >
          <font-awesome-icon icon="fa-brands fa-facebook" />
        </a>
        <a href="https://twitter.com" class="tm-social-link">
          <font-awesome-icon icon="fa-brands fa-twitter" />
        </a>
        <a href="https://instagram.com" class="tm-social-link">
          <font-awesome-icon icon="fa-brands fa-instagram" />
        </a>
        <a href="https://linkedin.com" class="tm-social-link">
          <font-awesome-icon icon="fa-brands fa-linkedin" />
        </a>
      </div>
      <p class="tm-mb-80 pr-5 text-white">
        Xtra Blog is a multi-purpose HTML template from TemplateMo website. Left
        side is a sticky menu bar. Right side content will scroll up and down.
      </p>
    </div>
  </header>
</template>

<script>
import Swal from 'sweetalert2'
import axios from 'axios'

export default {
  name: 'SideBar',
  data () {
    return {
      isAdmin: false
    }
  },
  methods: {
    handleLogout () {
      axios({
        url: 'http://localhost:3003/logout',
        method: 'PATCH',
        data: {
          isLogin: 'N',
          email: localStorage.getItem('email')
        }
      })
        .then((response) => {
          localStorage.removeItem('accesstoken')
          localStorage.removeItem('email')
          Swal.fire({
            icon: 'success',
            title: 'OK!',
            text: 'Log Out Success'
          })
          this.$router.push({ name: 'login' })
        })
        .catch((error) => {
          console.log(error)
          Swal.fire({
            icon: 'error',
            title: 'Oops..',
            text: 'Something Wrong, please try again!'
          })
        })
    },
    goToAbsenPage () {
      this.$router.push({ name: 'AbsenPage' })
    },
    backToHome () {
      this.$router.push({ name: 'home' })
    },
    goToCreateClass () {
      this.$router.push({ name: 'CreateClassPage' })
    }
  },
  created () {
    if (localStorage.getItem('role') === 'Admin') {
      this.isAdmin = true
    } else {
      this.isAdmin = false
    }
  }
}
</script>

<style>
</style>
