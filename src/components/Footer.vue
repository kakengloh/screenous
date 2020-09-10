<template>
    <nav class="navbar footer">
        <span class="copyright">Copyright© 2020 SCREENOUS. All rights reserved. </span>
    </nav>
</template>

<script>
export default {
    name: 'Footer'
}
</script>

<style scoped>

.footer {
    position: fixed;
    bottom: 0;
    left: 0;
    clear: both;
    width: 100%;
    background-color: #384FB7;
    height: 5vh;
}

.copyright {
    color: white;
    font-size: 13px;
}

</style>