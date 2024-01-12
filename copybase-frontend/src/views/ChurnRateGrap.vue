<script setup lang="ts">
import Toast from 'primevue/toast';
import Chart from 'primevue/chart';
import { useToast } from "primevue/usetoast";
const toast = useToast();

import { ref, onMounted } from "vue";

onMounted(() => {
    chartData.value = setChartData();
    chartOptions.value = setChartOptions();
});

const chartData = ref();
const chartOptions = ref();

const chartRgb = ['rgba(8, 245, 0, 0.87)', 'rgba(97, 250, 255, 0.67)']
const months = ['Cancelados', 'Ativos']
const chartColors = months.map((month, index) => index % 2 ? chartRgb[0] : chartRgb[1])
onMounted(() => {
    chartData.value = setChartData();
    chartOptions.value = setChartOptions();
});

const setChartData = () => {
    const documentStyle = getComputedStyle(document.body);

    return {
        labels: months,
        datasets: [
            {
                data: [60, 40],
                backgroundColor: chartColors,
            }
        ]
    };
};

const setChartOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = '#00bd7e';

    return {
        plugins: {
            legend: {
                labels: {
                    usePointStyle: true,
                    color: textColor
                }
            }
        }
    };
};


</script>

<template>
  <div class="card flex justify-content-center">
      <Chart type="pie" :data="chartData" :options="chartOptions" class="w-full md:w-30rem" />
  </div>
</template>