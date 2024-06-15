<template>
  <div class="flex flex-col gap-2 p-5 items-center">
    <h3>Criação de produtos</h3>
    <NInput v-model:value="name" placeholder="Nome do produto" />
    <NInputNumber class="min-w-full" v-model:value="price" placeholder="Preço do produto" />
    <NSelect :options="categoryOptions" v-model:value="selectedCategory" placeholder="Selecione uma categoria" />
    <NIcon size="30" class="self-end cursor-pointer" @click="showCreateCategory = !showCreateCategory">
      <ChevronUp v-if="showCreateCategory" />
      <ChevronDown v-else />
    </NIcon>
    <div v-if="showCreateCategory" class="flex gap-2">
      <NInput v-model:value="category" placeholder="Criar categoria" />
      <NButton type="primary" class="self-end w-[150px]" @click="createCategory">Criar Categoria</NButton>
    </div>
    <NButton type="info" class="self-end w-[150px]" @click="createProduct">Criar Produto</NButton>
  </div>
  <NSelect :options="categoryOptions" v-model:value="categoryFilter" @select="refreshProducts"
    @clear="categoryFilter = undefined" clearable placeholder="Selecione uma categoria" class="w-[300px] p-8" />
  <NGrid :cols="12" x-gap="5" y-gap="5" class="p-8">
    <NGi v-for="product in products" :key="product.id" :span="4">
      <NCard :title="product.name" class="h-full min-w-max">
        <div class="flex justify-between">
          <p>{{ new Intl.NumberFormat('pt-BR', { style: "currency", currency: "BRL" }).format(+product.price) }}</p>
          <NText>{{ product.category.name }}</NText>
          <NButton type="error" @click="() => deleteProduct(product.id)">Excluir</NButton>
        </div>
      </NCard>
    </NGi>
  </NGrid>
</template>

<script setup lang="ts">
import { ChevronDown, ChevronUp } from '@vicons/ionicons5'

const selectedCategory = ref<number>()
const name = ref<string>('')
const price = ref<number>()
const category = ref<string>("")
const { $client } = useNuxtApp()
const categoryFilter = ref<number>();
const showCreateCategory = ref<boolean>(false)

const { data: categories, refresh: refreshCategories } = await $client.category.findAll.useQuery()
const { data: products, refresh: refreshProducts, error } = await $client.product.findProductsByCategoryId.useQuery(categoryFilter)

const createProductMutation = $client.product.create.useMutation()
const createCategoryMutation = $client.category.create.useMutation()
const deleteProductMutation = $client.product.delete.useMutation()

const categoryOptions = computed(() => categories.value?.map(c => ({ label: c.name, value: c.id })))

const createProduct = async () => {
  if (!price.value || !name.value || !selectedCategory.value) return

  await createProductMutation.mutate({
    name: name.value,
    price: price.value,
    categoryId: selectedCategory.value
  })
  await refreshProducts()
  name.value = ''
  price.value = undefined
  selectedCategory.value = undefined
}

const createCategory = async () => {
  if (!category.value) return
  await createCategoryMutation.mutate(category.value)
  await refreshCategories()

  category.value = ""
}

const deleteProduct = async (id: number | undefined) => {
  if (!id) return
  await deleteProductMutation.mutate(
    id
  )
  await refreshProducts();
}


</script>