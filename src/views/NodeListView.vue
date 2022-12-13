<script setup>
import NodeCard from "../components/NodeCard.vue";
import NodeSidebar from "../components/NodeSidebar.vue";
import NodeControls from "../components/NodeControls.vue";
</script>

<template>
  <section class="container">
    <div class="row py-lg-5">
      <div class="col">
        <h1 class="fw-light">Libraries</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut
          ullamcorper dolor. Quisque a odio in justo aliquet facilisis. Mauris
          malesuada ipsum nisi, vel consequat nulla ornare ac. Donec non
          interdum libero, eget interdum sem. Proin sagittis condimentum ipsum
          semper aliquam. Duis faucibus vulputate aliquam. Proin et sapien
          vestibulum, fermentum massa eu, condimentum metus. Vestibulum ante
          ipsum primis in faucibus orci luctus et ultrices posuere cubilia
          curae; Ut malesuada risus ut metus ultricies feugiat. Mauris nec ipsum
          ac nibh suscipit interdum. Aliquam cursus sem ligula, non condimentum
          orci pulvinar eget. Vivamus ornare in dolor at scelerisque. In nec
          condimentum ex. Suspendisse potenti. Etiam sit amet volutpat justo.
        </p>
        <!-- <p class="lead text-muted">
          Something short and leading about the collection below—its contents,
          the creator, etc. Make it short and sweet, but not too short so folks
          don’t simply skip over it entirely.
        </p>
        <p>
          <a href="#" class="btn btn-primary my-2">Main call to action</a>
          <a href="#" class="btn btn-secondary my-2">Secondary action</a>
        </p> -->
      </div>
    </div>
  </section>

  <div class="album py-5 bg-light">
    <div class="container">


      <div class="row">
        <div class="col-4">
          <NodeSidebar />
        </div>




        <div class="col-8">
          <div class="container">

            <div class="row">
              <NodeControls />
            </div>

            <div class="row">
              <div class="col-6 mb-4">
                <NodeCard />
              </div>
              <div class="col-6 mb-4">
                <NodeCard />
              </div>
              <div class="col-6 mb-4">
                <NodeCard />
              </div>
              <div class="col-6 mb-4">
                <NodeCard />
              </div>
              <div class="col-6 mb-4">
                <NodeCard />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
