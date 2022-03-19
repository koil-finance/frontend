<template>
  <div class="flex items-center">
    <BalIcon name="search" size="sm" class="text-black mr-2" />
    <input
      ref="searchInput"
      :value="modelValue"
      :placeholder="placeholder"
      @input="handleInput"
      type="text"
      autocorrect="off"
      autocapitalize="none"
      class="border-0 input flex-auto w-full bg-transparent"
      style="color: rgba(0, 0, 0, 0.3);"
    />
  </div>
</template>

<script>
export default {
  props: ['modelValue', 'placeholder'],

  emits: ['update:modelValue'],

  mounted() {
    this.$refs.searchInput.focus();
  },

  methods: {
    handleInput(e) {
      const input = e.target.value;
      this.$emit('update:modelValue', input);
    }
  }
};
</script>

<style scoped>
input::placeholder {
  color: rgba(0, 0, 0, 0.3);
}
</style>
