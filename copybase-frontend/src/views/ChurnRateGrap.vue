<script setup lang="ts">
import Toast from 'primevue/toast';
import Chart from 'primevue/chart';
import { useToast } from "primevue/usetoast";
import { Subscriber, SubscriberService } from '../service/subscriber-service';
const toast = useToast();

import { ref, onMounted } from "vue";
import groupArray from 'group-array';

onMounted( async () => {
  const service = new SubscriberService()
    const subscribers = await service.getSubscribers()
    const group = groupArray(subscribers, 'status')
    chartData.value = setChartData(group);
    chartOptions.value = setChartOptions(group);
});

const chartData = ref();
const chartOptions = ref();

const status = [
  'ATIVA', 
  'ATRASADA', 
  'CANCELADA', 
  'TRIALCANCELADO', 
  'UPGRADE'
]
const chartColors = [
  'rgba(8, 245, 0, 0.87)', 
  'rgba(97, 250, 255, 0.67)', 
  'rgba(97, 250, 167, 0.67)', 
  'rgba(247, 46, 30, 0.67)',
  'rgba(247, 46, 229, 0.67)'
]

const setChartData = (subscribers) => {
    const documentStyle = getComputedStyle(document.body);

    const { ATIVA, ATRASADA, CANCELADA, TRIALCANCELADO, UPGRADE } = subscribers

    const totalSize = ATIVA.length + ATRASADA.length + UPGRADE.length
    const activePercentage = (100 * ATIVA.length ) / totalSize
    const latePercentage = (100 * ATRASADA.length ) / totalSize
    const canceladaPercentage = (100 * CANCELADA.length ) / totalSize
    const trialCalceladaPercentage = (100 * TRIALCANCELADO.length ) / totalSize
    const upgradePercentage = (100 * UPGRADE.length ) / totalSize

    return {
        labels: status,
        datasets: [
            {
                data: [activePercentage, latePercentage, upgradePercentage, canceladaPercentage, trialCalceladaPercentage],
                backgroundColor: chartColors,
            }
        ]
    };
};

const setChartOptions = (subscribers) => {
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