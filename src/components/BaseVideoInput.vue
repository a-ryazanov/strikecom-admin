<template>
    <div class="baseVideoInput videoInput">
        <BaseButton
            class="videoInput__button"
            @click="openModal({})"
        >
            <PlusIcon class="videoInputButton__icon"/>
        </BaseButton>

        <div class="videoInput__tags-cnt">
            <div
                v-for="(video, index) in $props.value"
                :key="video.url"
                class="videoInput__tag-cnt"
            >
                <span
                    class="videoInput__tag"
                    @click="openModal(video)"
                    v-text="video.url"
                />

                <!-- Обертка нужна потому, что `@click` на самой иконке не работает
                даже несмотря на модификатор `.native` -->
                <div @click="deleteVideo(index)">
                    <CloseIcon class="videoInputTag__icon"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BaseButton from '@x10d/vue-kit/src/components/BaseButton.vue'
import BaseModalForm from '@x10d/vue-kit/src/components/BaseModalForm.vue'
import CloseIcon from '@x10d/vue-kit/src/assets/icons/close.svg'
import PlusIcon from '@x10d/vue-kit/src/assets/icons/plus.svg'

import {
    addVideoFormView,
    assembleCommonModalConfig,
} from '@/module-views/common-parts'


export default {
    name: 'BaseVideoInput',

    components: {
        BaseButton,
        CloseIcon,
        PlusIcon,
    },

    props: {
        value: {
            required: true,
            validator: value => Array.isArray(value) || value === undefined,
        },
    },

    computed: {
        valueModel: {
            get() {
                return this.$props.value
            },
            set(newVal) {
                this.$emit('input', newVal)
            },
        },
    },

    methods: {
        async openModal(formData) {
            const modalResult = await this.$qrKitOpenModal(
                BaseModalForm,
                {
                    ...assembleCommonModalConfig(
                        'Добавление видео',
                        'Добавить',
                        addVideoFormView,
                    ).payload,
                    formData,
                },
            )

            if (modalResult.reason === 'accept') {
                this.valueModel = this.$props.value
                    ? [ ...this.$props.value, modalResult.payload.formData ]
                    : [ modalResult.payload.formData ]
            }
        },

        deleteVideo(videoIdx) {
            this.valueModel = this.valueModel.filter((video, index) => videoIdx !== index)
        },
    },
}
</script>

<style scoped lang="stylus">
@import '~@x10d/vue-kit/src/styles/variables/colors.styl'
@import '~@x10d/vue-kit/src/styles/variables/controlsInputs.styl'
@import '../styles/palette.styl'

.videoInput
    display flex
    align-items center
    width 100%

.videoInputButton__icon
    fill $globalColorComet

.videoInput__tags-cnt
    display flex
    align-items center
    flex-wrap wrap
    margin-left 8px

.videoInput__tag-cnt
    display flex
    align-items center
    max-width 120px
    margin 4px 4px 0 0
    padding 2px 4px
    border-radius 2px
    background-color $globalColorCaribbeanGreen

.videoInput__tag
    font-size 13px
    font-weight 500
    color $catskill-white
    white-space nowrap
    overflow hidden
    text-overflow ellipsis

    &:hover
        cursor pointer
        opacity 0.8

.videoInputTag__icon
    flex-shrink 0
    margin-left 6px
    fill $globalColorMischka

    &:hover
        cursor pointer
        fill $globalColorBittersweet

</style>
