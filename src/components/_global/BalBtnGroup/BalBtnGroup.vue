<template>
  <div class="flex">
    <BalBtn
      v-for="option in options"
      :key="option.value"
      @click="onSelect(option)"
      outline
      size="sm"
      class="capitalize mr-2 w-18"
      style="border-color: #dedde1; border-radius: 4px;"
      :style="{
        background: modelValue === option.value ? '#AC503F' : 'white',
        boxShadow:
          modelValue === option.value ? '0px 0px 0px 2px #F7CCC4' : 'none',
        border:
          modelValue === option.value
            ? '1px solid #F7CCC4'
            : '1px solid #dedde1'
      }"
      v-bind="attrs_"
      :color="modelValue === option.value ? 'white' : 'black'"
    >
      {{ 'best' === option.label ? $t(option.label) : option.label }}
    </BalBtn>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import omit from 'lodash/omit';

interface Option {
  value: string | number;
  label: string;
}

export default defineComponent({
  name: 'BalBtnGroup',

  inheritAttrs: false,

  emits: ['update:modelValue'],

  props: {
    modelValue: { type: [String, Number], required: true },
    options: { type: Array as PropType<Option[]>, required: true }
  },

  setup(props, { emit, attrs }) {
    // COMPUTED
    const attrs_ = computed(() => omit(attrs, 'options'));

    // METHODS
    function onSelect(option: Option) {
      emit('update:modelValue', option.value);
    }

    return {
      // computed
      attrs_,

      // methods
      onSelect
    };
  }
});
</script>
