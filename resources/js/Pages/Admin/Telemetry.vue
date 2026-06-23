<script setup lang="ts">
import { Head } from '@inertiajs/vue3'
import { ref, onMounted, onUnmounted } from 'vue'
import { Activity, Users, Globe, Cpu, Database, Server } from 'lucide-vue-next'

const stats = ref({
    activeVisitors: Math.floor(Math.random() * 10) + 1,
    pageViews: 45032,
    avgLoadTime: '124ms',
    uptime: '99.99%',
    cpuUsage: 14,
    memoryUsage: 45
})

let interval: number | null = null

onMounted(() => {
    // Simulate real-time websocket updates
    interval = window.setInterval(() => {
        stats.value.activeVisitors = Math.max(1, stats.value.activeVisitors + (Math.random() > 0.5 ? 1 : -1))
        stats.value.cpuUsage = Math.floor(Math.random() * 30) + 5
        stats.value.memoryUsage = Math.floor(Math.random() * 10) + 40
        if (Math.random() > 0.8) stats.value.pageViews += 1
    }, 2000)
})

onUnmounted(() => {
    if (interval) clearInterval(interval)
})
</script>

<template>
    <Head title="Telemetry Dashboard | Admin" />

    <div class="telemetry-dashboard">
        <header class="dashboard-header">
            <div class="brand">
                <Activity class="brand-icon" :size="28" />
                <h1>Real-Time Telemetry</h1>
            </div>
            <div class="status-indicator">
                <span class="pulse"></span>
                System Operational
            </div>
        </header>

        <main class="dashboard-grid">
            <div class="stat-card">
                <div class="stat-header">
                    <Users class="stat-icon" :size="20" />
                    <span>Active Visitors</span>
                </div>
                <div class="stat-value text-accent">{{ stats.activeVisitors }}</div>
                <div class="stat-trend">+2 this minute</div>
            </div>

            <div class="stat-card">
                <div class="stat-header">
                    <Globe class="stat-icon" :size="20" />
                    <span>Total Pageviews</span>
                </div>
                <div class="stat-value">{{ stats.pageViews.toLocaleString() }}</div>
                <div class="stat-trend">Global traffic</div>
            </div>

            <div class="stat-card">
                <div class="stat-header">
                    <Cpu class="stat-icon" :size="20" />
                    <span>CPU Usage</span>
                </div>
                <div class="stat-value">{{ stats.cpuUsage }}%</div>
                <div class="progress-bar">
                    <div class="progress-fill" :style="{ width: stats.cpuUsage + '%' }"></div>
                </div>
            </div>

            <div class="stat-card">
                <div class="stat-header">
                    <Database class="stat-icon" :size="20" />
                    <span>Memory Usage</span>
                </div>
                <div class="stat-value">{{ stats.memoryUsage }}%</div>
                <div class="progress-bar">
                    <div class="progress-fill warning" :style="{ width: stats.memoryUsage + '%' }"></div>
                </div>
            </div>

            <div class="stat-card">
                <div class="stat-header">
                    <Server class="stat-icon" :size="20" />
                    <span>Avg Response Time</span>
                </div>
                <div class="stat-value text-success">{{ stats.avgLoadTime }}</div>
                <div class="stat-trend">US East Edge</div>
            </div>
        </main>
    </div>
</template>

<style scoped>
.telemetry-dashboard {
    min-height: 100vh;
    background: #050811;
    color: #e2e8f0;
    padding: 2rem;
    font-family: ui-sans-serif, system-ui, sans-serif;
}

.dashboard-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 3rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid rgba(148, 163, 184, 0.1);
}

.brand {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.brand-icon {
    color: #38bdf8;
}

.brand h1 {
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0;
    color: #f8fafc;
}

.status-indicator {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    font-size: 0.85rem;
    color: #94a3b8;
    background: rgba(15, 23, 42, 0.6);
    padding: 0.5rem 1rem;
    border-radius: 999px;
    border: 1px solid rgba(148, 163, 184, 0.1);
}

.pulse {
    width: 8px;
    height: 8px;
    background: #10b981;
    border-radius: 50%;
    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
    animation: pulse-animation 2s infinite;
}

@keyframes pulse-animation {
    0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
    70% { box-shadow: 0 0 0 6px rgba(16, 185, 129, 0); }
    100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
}

.dashboard-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
}

.stat-card {
    background: rgba(15, 23, 42, 0.6);
    border: 1px solid rgba(148, 163, 184, 0.1);
    border-radius: 1rem;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
}

.stat-header {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    color: #94a3b8;
    font-size: 0.9rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.stat-icon {
    color: #64748b;
}

.stat-value {
    font-size: 2.5rem;
    font-weight: 700;
    color: #f8fafc;
    line-height: 1;
}

.text-accent { color: #38bdf8; }
.text-success { color: #10b981; }

.stat-trend {
    font-size: 0.8rem;
    color: #64748b;
}

.progress-bar {
    width: 100%;
    height: 6px;
    background: rgba(148, 163, 184, 0.1);
    border-radius: 999px;
    overflow: hidden;
    margin-top: 0.5rem;
}

.progress-fill {
    height: 100%;
    background: #38bdf8;
    transition: width 0.3s ease;
}

.progress-fill.warning {
    background: #f59e0b;
}
</style>
