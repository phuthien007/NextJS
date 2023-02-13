import { useApi, useStores, defineInterface } from '@directus/extensions-sdk';
import { defineComponent, computed, ref, watchEffect, resolveComponent, openBlock, createBlock, unref } from 'vue';

var script = /*#__PURE__*/ defineComponent({
    __name: 'interface',
    props: {
        collection: {
            type: String,
            required: true,
        },
        field: {
            type: String,
            required: true,
        },
        value: {
            type: [Object, Number, null],
            default: null,
        },
    },
    emits: ['input'],
    setup(__props, { emit }) {
        const props = __props;
        const api = useApi();
        const stores = useStores();
        const fieldsStore = stores.useFieldsStore();
        const relationsStore = stores.useRelationsStore();
        const collectionsStore = stores.useCollectionsStore();
        const relatedCollection = collectionsStore.getCollection(relationsStore.getRelationForField(props.collection, props.field).related_collection);
        const fields = computed(() => {
            if (!relatedCollection)
                return [];
            return fieldsStore.getFieldsForCollection(relatedCollection.collection);
        });
        const isId = (value) => typeof value === typeof Number();
        const initial = ref({});
        const value = computed({
            get: () => (isId(props.value) ? initial.value : props.value),
            set: (value) => {
                emit('input', value);
            },
        });
        watchEffect(async () => {
            if (isId(props.value)) {
                const response = await api.get(`/items/${relatedCollection.collection}?filter[id][_eq]=${props.value}`);
                const data = response.data.data;
                if (data.length === 1)
                    initial.value = data[0];
            }
        });
        return (_ctx, _cache) => {
            const _component_v_form = resolveComponent("v-form");
            return (openBlock(), createBlock(_component_v_form, {
                fields: unref(fields),
                "initial-values": initial.value,
                "model-value": unref(value),
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => (value.value = $event))
            }, null, 8 /* PROPS */, ["fields", "initial-values", "model-value"]));
        };
    }
});

script.__file = "src/interface.vue";

var index = defineInterface({
    id: "seo",
    name: "SEO",
    icon: "link",
    description: "SEO Integration",
    types: ["alias"],
    localTypes: ["m2o"],
    component: script,
    group: "relational",
    relational: true,
    options: null,
});

export { index as default };
