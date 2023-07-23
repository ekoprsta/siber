<template>
  <div>
    <SideBar></SideBar>
    <div class="container-fluid">
      <main class="tm-main">
        <h2 class="tm-pt-30 tm-color-primary">
          Welcome, One Page for All
        </h2>
        <div class="row tm-row">
          <article class="col-12 col-md-6 tm-post">
            <hr class="tm-hr-primary" />
              <div class="tm-post-link-inner">
                <img src="assets/img/sdtni.jpg" alt="Image" class="img-fluid" />
              </div>
              <h2 class="tm-pt-30 tm-color-primary tm-post-title">
                Studi Dasar Terpadu Nilai Islam (SDTNI)
              </h2>
              <hr />
          </article>
          <article class="col-12 col-md-6 tm-post">
            <hr class="tm-hr-primary" />
              <div class="tm-post-link-inner">
                <img src="assets/img/bmaq.png" alt="Image" class="img-fluid" />
              </div>
              <h2 class="tm-pt-30 tm-color-primary tm-post-title">
                Bimbingan Mahir Al-Qur'an (BMAQ)
              </h2>
            <hr />
          </article>
          <article class="col-12 col-md-6 tm-post">
            <hr class="tm-hr-primary" />
              <div class="tm-post-link-inner">
                <img src="assets/img/sc.jpg" alt="Image" class="img-fluid" />
              </div>
              <h2 class="tm-pt-30 tm-color-primary tm-post-title">
                Sister Club (SC)
              </h2>
            <hr />
          </article>
          <article class="col-12 col-md-6 tm-post">
            <hr class="tm-hr-primary" />
              <div class="tm-post-link-inner">
                <img src="assets/img/sdis.png" alt="Image" class="img-fluid" />
              </div>
              <h2 class="tm-pt-30 tm-color-primary tm-post-title">
                Studi Dasar Islam Siswa (SDIS)
              </h2>
            <hr />
          </article>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import SideBar from '../components/SideBar.vue'

export default {
  name: 'HomeView',
  components: {
    SideBar
  }
}
</script>
