<template>
    <!-- Custom cursor disabled per user preference -->
</template>

<style scoped>
.custom-cursor {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99999;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.3s ease;
    mix-blend-mode: difference;
}

.custom-cursor.visible {
    opacity: 1;
}

.cursor-dot {
    width: 6px;
    height: 6px;
    background: #5eead4;
    border-radius: 50%;
    position: fixed;
    top: 0;
    left: 0;
    margin-top: -3px;
    margin-left: -3px;
}

.cursor-ring {
    width: 20px;
    height: 20px;
    border: 1px solid rgba(94, 234, 212, 0.5);
    border-radius: 50%;
    position: fixed;
    top: 0;
    left: 0;
    margin-top: -10px;
    margin-left: -10px;
    transition: width 0.3s ease, height 0.3s ease;
}
</style>
