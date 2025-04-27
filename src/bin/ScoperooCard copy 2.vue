<template>
  <div class="bg-white p-4 sm:p-6 rounded-2xl text-left select-none">
    <h4
      class="title-sm font-semibold pb-6 mb-16 border-b border-neutral300 capitalize"
    >
      {{ data?.categoryName }}
    </h4>

    <!-- range  -->
    <div>
      <RangeSlider
        :maxIndex="maxIndex"
        :sliderHandler="handleChangeSlider"
        :value="selectedItemIndex"
        :amount="finalProduct.productPrice?.toString()"
      ></RangeSlider>
    </div>

    <!-- single order title  -->
    <div
      class="flex items-center justify-between gap-4 pb-6 mb-6 border-b border-neutral300"
    >
      <h4 class="title-sm font-semibold ellipsis max-w-full">
        {{ finalProduct?.productName }}
      </h4>
      <button
        class="flex items-center gap-2 bg-neutral300 px-3.5 py-1.5 rounded-lg border border-neutral200"
        v-if="finalProduct.isSaved"
        disabled
      >
        <span class="text-sm uppercase">{{ finalProduct?.quantity }}x </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="23"
          height="23"
          viewBox="0 0 23 23"
          fill="none"
        >
          <path
            d="M7.1731 8.15283L11.5069 12.4772L15.8407 8.15283L17.172 9.48413L11.5069 15.1493L5.8418 9.48413L7.1731 8.15283Z"
            fill="#616161"
          />
        </svg>
      </button>
      <dropdown
        classes="w-full bg-white border w-56 drop-left drop-end z-50"
        v-else
      >
        <template v-slot:toggle>
          <button
            class="flex items-center gap-2 bg-neutral300 px-3.5 py-1.5 rounded-lg border border-neutral200"
          >
            <span class="text-sm uppercase"
              >{{ finalProduct?.quantity }}x
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="23"
              height="23"
              viewBox="0 0 23 23"
              fill="none"
            >
              <path
                d="M7.1731 8.15283L11.5069 12.4772L15.8407 8.15283L17.172 9.48413L11.5069 15.1493L5.8418 9.48413L7.1731 8.15283Z"
                fill="#616161"
              />
            </svg>
          </button>
        </template>
        <template v-slot:menu>
          <ul class="shadow bg-white text-black900 rounded">
            <li
              class="pl-4 pr-8 py-1.5 cursor-pointer hover:bg-neutral200 duration-200 item"
              @click="handleQuantity(finalProduct?._id, 1)"
            >
              1x
            </li>
            <li
              class="pl-4 pr-8 py-1.5 cursor-pointer hover:bg-neutral200 duration-200 item"
              @click="handleQuantity(finalProduct?._id, 2)"
            >
              2x
            </li>
            <li
              class="pl-4 pr-8 py-1.5 cursor-pointer hover:bg-neutral200 duration-200 item"
              @click="handleQuantity(finalProduct?._id, 3)"
            >
              3x
            </li>
            <li
              class="pl-4 pr-8 py-1.5 cursor-pointer hover:bg-neutral200 duration-200 item"
              @click="handleQuantity(finalProduct?._id, 4)"
            >
              4x
            </li>
            <li
              class="pl-4 pr-8 py-1.5 cursor-pointer hover:bg-neutral200 duration-200 item"
              @click="handleQuantity(finalProduct?._id, 5)"
            >
              5x
            </li>
          </ul>
        </template>
      </dropdown>
    </div>

     
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import RangeSlider from "../shared/RangeSlider.vue";
import dropdown from "../shared/dropdown.vue";
export default {
  props: {
    data: Object,
    handleOrder: Function,
    handleRemoveOrder: Function,
  },
  components: {
    RangeSlider,
    dropdown,
  },
  data() {
    return {
      selectedItemIndex: 0,
      quantity: 1,
      initAddons: [],
      allProducts: [],
    };
  },
  computed: {
    ...mapState({
      cartOrders: (state) => state.scoperooModule.cartOrders,
      showQuickSaveModal: (state) =>
        state.scoperooModule.modals.isQuickSaveShow,
    }),
    maxIndex() {
      return this.data?.products?.length - 1;
    },

    allAddOns() {
      const extractData = this.data?.products?.map((item) => {
        const finalAddOns = item?.productAddons?.map((productAddon) => {
          return {
            ...productAddon,
            quantity: 1,
            isActive: false,
          };
        });
        return {
          productId: item?._id,
          productAddons: { ...finalAddOns },
        };
      });
      return extractData;
    },

    currentProduct() {
      const extractData = this.allProducts[this.selectedItemIndex];

      const findInCart = this.cartOrders?.findIndex(
        (item) => item?._id === extractData?._id
      );
      const isSaved = findInCart !== -1 ? true : false;

      if (this.initAddons && this.initAddons?.length > 0) {
        const currentProductAddOn = this.initAddons?.find(
          (item) => item?.productId === extractData?._id
        );
        const addOnsAmount = this.calculateTotal(currentProductAddOn);
        const totalPrice =
          parseInt(extractData?.productPrice || "0") *
            parseInt(extractData?.quantity || "0") +
          addOnsAmount;
        return {
          ...extractData,
          isSaved: isSaved,
          totalPrice: totalPrice?.toFixed(2),
          productAddons: { ...currentProductAddOn?.productAddons },
        };
      } else {
        return {
          isSaved: isSaved,
          ...extractData,
        };
      }
    },

    finalProduct() {
      const obj = this.cartOrders.find(
        (item) => item?._id === this.currentProduct?._id
      );

      if (obj?._id) {
        const addOnsAmount = this.calculateAddOnTotal(obj.productAddons);
        const totalPrice =
          parseInt(obj?.productPrice || "0") * parseInt(obj?.quantity || "0") +
          addOnsAmount;

        return {
          ...this.currentProduct,
          productAddons: { ...obj?.productAddons },
          isSaved: true,
          quantity: obj.quantity,
          totalPrice: totalPrice?.toFixed(2),
        };
      } else {
        return {
          isSaved: false,
          ...this.currentProduct,
        };
      }
    },
  },

  mounted() {
    const cloneProducts = JSON.parse(JSON.stringify(this.data || "{}"));
    const finalProducts = cloneProducts.products?.map((item) => {
      return {
        categoryId: cloneProducts?._id,
        categoryName: cloneProducts?.title,
        categoryType: cloneProducts?.type,
        ...item,
        quantity: 1,
      };
    });
    this.allProducts = JSON.parse(JSON.stringify(finalProducts || "{}"));
    this.setCurrentData();
    this.initAddons =
      this.allAddOns?.length > 0 ? [...(this.allAddOns || null)] : [];
  },

  methods: {
    ...mapMutations(["changeModalStatus"]),
    handleChangeSlider(event) {
      const value = parseInt(event.target.value || "0");
      this.selectedItemIndex = value;
    },
    handleQuantity(productId, value) {
      const data = JSON.parse(JSON.stringify(this.allProducts || "{}"));
      const newProducts = data?.map((product) => {
        if (product?._id === productId) {
          return {
            ...product,
            quantity: value,
          };
        } else {
          return product;
        }
      });
      this.allProducts = JSON.parse(JSON.stringify(newProducts || "{}"));
    },
    handleAddOnsActive(productId, addOnIndex) {
      const data = JSON.parse(JSON.stringify(this.initAddons || "{}"));
      const index = data.findIndex((item) => item.productId === productId);
      if (index !== -1) {
        data[index].productAddons[addOnIndex].isActive =
          !data[index].productAddons[addOnIndex].isActive;
      }
      this.initAddons = data;
    },
    handleAddOnsQuantity(productId, addOnIndex, newQuantity) {
      const data = JSON.parse(JSON.stringify(this.initAddons || "{}"));
      const index = data.findIndex((item) => item.productId === productId);
      if (index !== -1) {
        data[index].productAddons[addOnIndex].quantity = newQuantity;
      }
      this.initAddons = data;
    },
    calculateTotal(productAddons) {
      if (productAddons) {
        const addOnsArray = Object.values(productAddons.productAddons);
        const activeAddOns = addOnsArray?.filter((item) => item?.isActive);
        if (activeAddOns?.length > 0) {
          const amount = activeAddOns.reduce((total, productAddon) => {
            return total + productAddon.addonPrice * productAddon.quantity;
          }, 0);
          return amount;
        } else {
          return 0;
        }
      } else {
        return 0;
      }
    },
    calculateAddOnTotal(productAddons) {
      const addOnsArray = Object.values(productAddons);

      const filterArray = addOnsArray.filter((item) => item?.isActive);

      if (filterArray?.length > 0) {
        const amount = filterArray?.reduce((total, productAddon) => {
          return total + productAddon?.addonPrice * productAddon?.quantity;
        }, 0);
        return amount;
      } else {
        return 0;
      }
    },
    handleDeselect(product) {
      const productsClone = JSON.parse(
        JSON.stringify(this.allProducts || "{}")
      );
      const addOnsClone = JSON.parse(JSON.stringify(this.initAddons || "{}"));
      const newProducts = productsClone.map((item) => {
        if (item?._id === product?._id) {
          return {
            ...item,
            quantity: 1,
          };
        } else {
          return item;
        }
      });

      const newAddons = addOnsClone.map((item) => {
        if (item?.productId === product?._id) {
          const modifiedAddOns = Object.fromEntries(
            Object.entries(item.addOns).map(([key, addOn]) => [
              key,
              { ...addOn, quantity: 1, isActive: false },
            ])
          );

          return {
            ...item,
            addOns: modifiedAddOns,
          };
        } else {
          return item;
        }
      });
      this.handleRemoveOrder(product);
      this.allProducts = JSON.parse(JSON.stringify(newProducts || "{}"));
      this.initAddons = JSON.parse(JSON.stringify(newAddons || "{}"));
    },
    setCurrentData() {},
    handleProduct() {
      if (!this.showQuickSaveModal) {
        this.changeModalStatus({
          name: "isQuickSaveShow",
          value: true,
        });
        this.changeModalStatus({
          name: "showQuickSaveModal",
          value: true,
        });
      }
      this.handleOrder(this.finalProduct);
    },
  },
};
</script>

<style></style>
