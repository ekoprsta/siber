<template>
  <section class="vh-100" style="background-color: #eee">
    <div class="container h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-lg-12 col-xl-11">
          <div class="card text-black" style="border-radius: 25px">
            <div class="card-body p-md-5">
              <div class="row justify-content-center">
                <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                  <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                    Sign up
                  </p>
                  <!-- form  -->
                  <form class="mx-1 mx-md-4" @submit.prevent="handleRegister">
                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0">
                        <input
                          type="text"
                          id="form3Example1c"
                          class="form-control"
                          placeholder="Full Name"
                          v-model="newUser.fullName"
                        />
                      </div>
                    </div>

                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0">
                        <input
                          type="email"
                          id="form3Example3c"
                          class="form-control"
                          placeholder="your email address"
                          v-model="newUser.email"
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
                          v-model="newUser.password"
                        />
                      </div>
                    </div>

                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-key fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0">
                        <input
                          type="text"
                          id="form3Example4cd"
                          class="form-control"
                          placeholder="phone number"
                          v-model="newUser.phoneNumber"
                        />
                      </div>
                    </div>

                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-key fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0">
                        <input
                          type="text"
                          id="form3Example4cd"
                          class="form-control"
                          placeholder="Address"
                          v-model="newUser.address"
                        />
                      </div>
                    </div>

                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-key fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0">
                        <input
                          type="text"
                          id="form3Example4cd"
                          class="form-control"
                          placeholder="Occupation"
                          v-model="newUser.occupation"
                        />
                      </div>
                    </div>

                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-key fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0">
                        <select name="role" id="" class="form-select" v-model="newUser.role">
                          <option value="" disabled>----- Select Role -----</option>
                          <option value="User">User</option>
                          <option value="Admin">Admin</option>
                        </select>
                      </div>
                    </div>

                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-key fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0">
                        <select name="departmentId" id="" class="form-select" v-model="newUser.departmentId">
                          <option value="" disabled>----- Select Department -----</option>
                          <option v-for="department in departments" :key="department.id" v-bind:value='department.id'>{{ department.name }}</option>
                        </select>
                      </div>
                    </div>

                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-key fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0">
                        <input
                          type="text"
                          id="form3Example4cd"
                          class="form-control"
                          placeholder="Batch"
                          v-model="newUser.batch"
                        />
                      </div>
                    </div>

                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-key fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0">
                        <input
                          type="text"
                          id="form3Example4cd"
                          class="form-control"
                          placeholder="Place Of Birth"
                          v-model="newUser.placeOfBirth"
                        />
                      </div>
                    </div>

                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-key fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0">
                        <input
                          type="date"
                          id="form3Example4cd"
                          class="form-control"
                          placeholder="Date of Birth"
                          v-model="newUser.dateOfBirth"
                        />
                      </div>
                    </div>

                    <div
                      class="d-flex justify-content-center mx-4 mb-3 mb-lg-4"
                    >
                      <button type="submit" class="btn btn-primary btn-lg">
                        Register
                      </button>
                    </div>
                  </form>
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
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
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
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
export default {
  name: 'RegisterPage',
  data () {
    return {
      newUser: {
        fullName: '',
        email: '',
        password: '',
        address: '',
        placeOfBirth: '',
        dateOfBirth: '',
        phoneNumber: '',
        batch: '',
        departmentId: '',
        occupation: '',
        Role: ''
      }
    }
  },
  methods: {
    handleRegister () {
      const { fullName, email, password, address, placeOfBirth, dateOfBirth, phoneNumber, batch, departmentId, occupation, role } = this.newUser
      axios({
        url: 'http://localhost:3003/register',
        method: 'POST',
        data: {
          fullName, email, password, address, placeOfBirth, dateOfBirth, phoneNumber, batch, departmentId, occupation, role
        }
      })
        .then((response) => {
          this.newUser.fullName = ''
          this.newUser.email = ''
          this.newUser.password = ''
          this.newUser.address = ''
          this.newUser.placeOfBirth = ''
          this.newUser.dateOfBirth = ''
          this.newUser.phoneNumber = ''
          this.newUser.batch = ''
          this.newUser.departmentId = ''
          this.newUser.role = ''
          Swal.fire({
            icon: 'success',
            title: 'OK!',
            text: 'Register Success, please Login'
          })
          this.$router.push({ name: 'login' })
        })
        .catch((error) => {
          console.log(error)
          this.newUser.fullName = ''
          this.newUser.email = ''
          this.newUser.password = ''
          this.newUser.address = ''
          this.newUser.placeOfBirth = ''
          this.newUser.dateOfBirth = ''
          this.newUser.phoneNumber = ''
          this.newUser.batch = ''
          this.newUser.departmentId = ''
          this.newUser.role = ''
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something wrong, please check your data!'
          })
        })
    }
  },
  computed: {
    departments () {
      return this.$store.state.departments
    }
  },
  created () {
    this.$store.dispatch('getDepartments')
  }
}
</script>

<style>
</style>
