<template>
  <div class="px-6 py-8">
    <SectionSeparator :title="$t('Header.Cart')" />

    <EmptyComponent
      v-if="cartItems.length === 0"
      :title="$t('Main.AddProductsToCart')"
    />

    <div
      v-else
      class="bg-white"
    >
      <div
        class="hidden lg:grid grid-cols-[1fr_2fr] gap-4 font-semibold text-md border-b-2 pb-2"
      >
        <div>{{ $t('Main.Product') }}</div>

        <div class="grid grid-cols-[1fr_2fr_1fr] gap-4 items-center">
          <div>{{ $t('Main.Size') }}</div>

          <div>{{ $t('Main.Quantity') }}</div>

          <div>{{ $t('Main.Price') }}</div>
        </div>
      </div>

      <div
        v-for="item in cartItems"
        :key="item.id"
        class="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-4 border-b-2 py-4"
      >
        <div class="flex items-center">
          <img
            :src="item.images[0]"
            alt="Product Image"
            class="w-16 h-16 object-cover object-top mr-4 flex-shrink-0"
          />

          <div>
            <h3
              class="text-xl font-semibold cursor-pointer hover:underline"
              @click="
                () =>
                  $router.push({
                    name: 'ProductCardPage',
                    params: { id: item.id }
                  })
              "
            >
              {{ item.name[locale] }}
            </h3>

            <p class="text-gray-600">
              {{ $t('Main.Producer') }}: {{ item.producer }}
            </p>

            <p class="font-semibold">
              {{ $t('Main.Price') }}: {{ Number(item.price).toFixed(2) }} грн
            </p>
          </div>
        </div>

        <div class="flex flex-col gap-2">
          <div
            v-for="reserved in item.reserved"
            :key="reserved.size"
            class="grid grid-cols-1 sm:grid-cols-[1fr_2fr_1fr] gap-4 items-center"
          >
            <p>{{ $t('Main.Size') }}: {{ reserved.size }}</p>

            <div class="w-fit">
              <vue-number-input
                :model-value="reserved.amount"
                size="small"
                inline
                controls
                :min="1"
                center
                @update:model-value="
                  newAmount =>
                    updateReservedAmount(item.id, reserved.size, newAmount)
                "
              />
            </div>

            <div class="relative">
              <button
                @click="removeItem(item.id, reserved.size)"
                class="absolute top-1/2 transform -translate-y-1/2 right-0 text-gray-500 hover:text-gray-700 text-2xl"
              >
                &times;
              </button>

              <p>{{ (reserved.amount * Number(item.price)).toFixed(2) }} грн</p>
            </div>
          </div>
        </div>
      </div>

      <div class="flex w-full items-center justify-center sm:justify-end">
        <div
          class="relative -top-[24px] flex flex-col items-center justify-center gap-4 mt-4 bg-slate-50 w-[410px] p-[30px]"
        >
          <p class="text-xl font-semibold">
            {{ $t('Main.TotalDue') }}: {{ grandTotal.toFixed(2) }} грн
          </p>

          <div>
            <ButtonComponent
              :title="$t('Main.MakeAnOrder')"
              red
              disabled
              @click="checkout"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted, computed } from 'vue';
  import { useI18n } from 'vue-i18n';
  import SectionSeparator from '@/components/elements/SectionSeparator.vue';
  import ButtonComponent from '@/components/elements/ButtonComponent.vue';
  import EmptyComponent from '@/components/empty/EmptyComponent.vue';

  const { locale } = useI18n();

  const cartItems = ref([]);

  const loadCartItems = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cartItems.value = cart;
  };

  const updateReservedAmount = (productId, size, newAmount) => {
    cartItems.value = cartItems.value.map(item => {
      if (item.id === productId) {
        return {
          ...item,
          reserved: item.reserved.map(reserved => {
            if (reserved.size === size) {
              return { ...reserved, amount: newAmount };
            }
            return reserved;
          })
        };
      }
      return item;
    });

    updateCart();
  };

  const removeItem = (productId, size) => {
    const updatedCart = cartItems.value
      .map(item => {
        if (item.id === productId) {
          return {
            ...item,
            reserved: item.reserved.filter(reserved => reserved.size !== size)
          };
        }
        return item;
      })
      .filter(item => item.reserved.length > 0);

    cartItems.value = updatedCart;
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const updateCart = () => {
    localStorage.setItem('cart', JSON.stringify(cartItems.value));
  };

  const checkout = () => {
    alert('Checkout not implemented yet.');
  };

  const grandTotal = computed(() => {
    if (!Array.isArray(cartItems.value)) return 0;

    return cartItems.value.reduce((total, item) => {
      if (!Array.isArray(item.reserved)) return total;

      return (
        total +
        item.reserved.reduce((subTotal, reserved) => {
          const amount = Number(reserved.amount) || 0;
          const price = Number(item.price) || 0;
          return subTotal + amount * price;
        }, 0)
      );
    }, 0);
  });

  onMounted(() => {
    loadCartItems();
  });
</script>

<style scoped></style>
