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
const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
const chartColors = months.map((month, index) => index % 2 ? chartRgb[0] : chartRgb[1])

const setChartData = () => {
    return {
        labels: months,
        datasets: [
            {
                label: 'Assinantes',
                data: [540, 325, 702, 1200, 230, 230, 230, 230, 230, 230, 230, 230],
                backgroundColor: chartColors,
            }
        ]
    };
};
const setChartOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = '#00bd7e';
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    return {
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColor
                },
                grid: {
                    color: surfaceBorder
                }
            },
            y: {
                beginAtZero: true,
                ticks: {
                    color: textColor
                },
                grid: {
                    color: surfaceBorder
                }
            }
        }
    };
}


</script>

<template>
  <div class="card">
      <Chart type="bar" :data="chartData" :options="chartOptions" />
  </div>
</template>