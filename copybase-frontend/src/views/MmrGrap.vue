<script setup lang="ts">
import Toast from 'primevue/toast';
import Chart from 'primevue/chart';
import { Subscriber, SubscriberService } from '../service/subscriber-service';
import { useToast } from "primevue/usetoast";
const toast = useToast();

import { ref, onMounted } from "vue";
import groupArray from 'group-array';

onMounted( async () => {
    const service = new SubscriberService()
    const subscribers = await service.getSubscribers()
    const subscribersGrouped = subscribers.map(subscriber => {
      const [month] = (new Date(subscriber.dataStatus).getMonth() + 1).toString()
      return {... subscriber, month} as Subscriber
    })
    const group = groupArray(subscribersGrouped, 'month')
    chartData.value = await setChartData(subscribersGrouped);
    chartOptions.value = await setChartOptions(subscribersGrouped);
});

const chartData = ref();
const chartOptions = ref();

const chartRgb = ['rgba(8, 245, 0, 0.87)', 'rgba(97, 250, 255, 0.67)']
const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
const chartColors = months.map((month, index) => index % 2 ? chartRgb[0] : chartRgb[1])

const setChartData = async (subscribers) => {

    const monthValues = subscribers.map(subscriber => {
      let sum = 0
      sum += subscriber.valor
      return sum
    })

    return {
        labels: months,
        datasets: [
            {
                label: 'Faturamento',
                data: monthValues,
                backgroundColor: chartColors,
            }
        ]
    };
};
const setChartOptions = async (subscribers) => {

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = '#00bd7e';
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