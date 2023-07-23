<template>
  <div class="container">
    <section class="vh-100" style="background-color: #eee">
      <div class="container h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-lg-12 col-xl-11">
            <div class="card text-black" style="border-radius: 25px">
              <div class="card-body p-md-5">
                <p class="text-center h1 fw-bold mx-1 mx-md-4 mt-4">
                    Sistem Informasi Bidang Pendidikan RISKA
                </p>
                <div class="row justify-content-center">
                  <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p class="text-center h3 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                      Sign In
                    </p>
                    <!-- form  -->
                    <form
                      class="mx-1 mx-md-4"
                      @submit.prevent="handleLoginSubmit"
                    >
                      <div class="d-flex flex-row align-items-center mb-4">
                        <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                        <div class="form-outline flex-fill mb-0">
                          <input
                            type="email"
                            id="form3Example3c"
                            class="form-control"
                            placeholder="your email address"
                            v-model="userLogin.email"
                          />
                        </div>
                      </div>

                      <div class="d-flex flex-row align-items-center mb-4">
                        <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                        <div class="form-outline flex-fill mb-0">
                          <input
                            type="password"
                            id="form3Example4c"
                            class="form-control"
                            placeholder="password"
                            v-model="userLogin.password"
                          />
                        </div>
                      </div>

                      <div
                        class="
                          d-flex
                          justify-content-center
                          mx-4
                          mb-3 mb-lg-4
                          text-center
                        "
                      >
                        <br />
                        <button type="submit" class="btn btn-primary btn-lg">
                          Sign In
                        </button>
                      </div>
                    </form>
                    <div
                      class="
                        d-flex
                        justify-content-center
                        mx-4
                        mb-3 mb-lg-4
                        text-center
                      "
                    >
                    <br />
                    <p>
                      Don't have an Account? <a href="#" @click.prevent="toRegisterPage">Register here</a>
                    </p>
                    </div>
                  </div>
                  <div
                    class="
                      col-md-10 col-lg-6 col-xl-7
                      d-flex
                      align-items-center
                      order-1 order-lg-2
                    "
                  >
                    <img
                      src="assets_1/images/mac.jpg"
                      class="img-fluid"
                      alt="Sample image"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import axios from 'axios'
export default {
  name: 'LoginPage',
  data () {
    return {
      userLogin: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    handleLoginSubmit () {
      axios({
        url: 'http://localhost:3003/login',
        method: 'POST',
        data: {
          email: this.userLogin.email,
          password: this.userLogin.password
        }
      })
        .then((response) => {
          const data = response.data
          localStorage.setItem('accesstoken', data.accesstoken)
          localStorage.setItem('email', data.email)
          localStorage.setItem('role', data.role)
          this.$router.push({ name: 'home' })
        })
        .catch((error) => {
          console.log(error)
          Swal.fire({
            icon: 'error',
            title: 'Oops..',
            text: 'Please Check Your Email or Password'
          })
        })
    },
    toRegisterPage () {
      this.$router.push({ name: 'register' })
    }
  }
}
</script>

<style>
</style>
