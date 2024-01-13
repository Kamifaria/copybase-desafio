<script setup lang="ts">
import Toast from 'primevue/toast';
import FileUpload from 'primevue/fileupload';
import { useToast } from "primevue/usetoast";
const toast = useToast();

const uploadUrl= "http://localhost:3000/subscriber"


const onUpload = () => {
  toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Arquivo Carregado!', life: 6000 });
};

</script>

<template>
  <div class="about">
    <Toast :pt="{
        container: { class: 'bg-yellow-100' }
    }"/>
    <FileUpload cancelLabel="Cancelar" chooseLabel="Selecione" name="file" :url="uploadUrl"
     @upload="onUpload"
      accept="text/csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" :maxFileSize="1000000">
    </FileUpload>
  </div>
</template>




<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>