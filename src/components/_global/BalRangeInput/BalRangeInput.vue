<template>
  <div class="pr-2">
    <div class="flex justify-between text-sm text-gray-500">
      <div>
        <slot v-if="$slots.leftLabel || leftLabel" name="leftLabel">
          {{ leftLabel }}
        </slot>
      </div>
      <div>
        <slot v-if="$slots.rightLabel || rightLabel" name="rightLabel">
          {{ rightLabel }}
        </slot>
      </div>
    </div>
    <vue-slider
      v-model="range"
      v-bind="$attrs"
      @change="onChange"
      @drag-end="onDragEnd"
      :dot-style="dotStyle"
      :rail-style="railSyle"
      :process-style="proccessStyle"
    />
  </div>
</template>

<script>
import { defineComponent, ref, watch, computed } from 'vue';
import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/antd.css';
import { theme } from '@/../tailwind.config';

export default defineComponent({
  name: 'BalRangeInput',

  components: {
    VueSlider
  },

  emits: ['change', 'update:modelValue', 'dragEnd'],

  props: {
    modelValue: { type: [String, Number], default: '0' },
    leftLabel: { type: String, default: '' },
    rightLabel: { type: String, default: '' }
  },

  setup(props, { emit }) {
    const range = ref(0);

    const colors = theme.extend.colors;

    function onChange(value) {
      emit('change', value);
      emit('update:modelValue', value);
    }

    function onDragEnd() {
      emit('dragEnd', props.modelValue);
    }

    const dotStyle = computed(() => {
      return {
        backgroundColor: '#ac503f',
        borderColor: '#ac503f',
        borderWidth: 0
      };
    });

    const railSyle = computed(() => {
      return {
        background: '#fef7e5'
      };
    });

    const proccessStyle = computed(() => {
      return {
        background: '#ac503f'
      };
    });

    watch(
      () => props.modelValue,
      newVal => {
        range.value = Number(newVal) || 0;
      },
      { immediate: true }
    );

    return {
      range,
      onChange,
      onDragEnd,
      dotStyle,
      railSyle,
      proccessStyle
    };
  }
});
</script>

<style>
.vue-slider-dot-handle-focus {
  box-shadow: 0 0 0 5px rgb(0, 0, 0, 0.2);
}
</style>
