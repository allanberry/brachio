<script setup></script>

<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <li class="page-item disabled">
        <a class="page-link" href="#" tabindex="-1" aria-disabled="true"
          >Previous</a
        >
      </li>
      <li class="page-item">
        <a class="page-link" href="#">1</a>
      </li>
      <li class="page-item">
        <span class="page-link" disabled>...</span>
      </li>

      <li class="page-item"><span class="page-link">3</span></li>
      <li class="page-item active">
        <span class="page-link">4</span>
      </li>
      <li class="page-item"><span class="page-link">5</span></li>

      <li class="page-item">
        <span class="page-link disabled">...</span>
      </li>

      <li class="page-item">
        <a class="page-link" href="#">12</a>
      </li>
      <li class="page-item">
        <a class="page-link" href="#">Next</a>
      </li>
    </ul>
  </nav>
</template>
