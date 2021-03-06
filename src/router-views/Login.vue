<template>
    <div class="login">
        <form
            v-loading="isLoading"
            class="loginForm"
        >
            <span
                class="loginForm__title"
                v-text="'Забастком'"
            />

            <div
                v-if="error"
                class="loginForm__error"
            >
                <InfoIcon/>
                <p
                    class="loginForm__errorText"
                    v-text="error.message"
                />
            </div>

            <div class="loginForm__providers-cnt">
                <ElButton
                    circle
                    size="large"
                    class="loginForm__provider"
                    @click="logIn('google')"
                >
                    <GoogleIcon class="loginFormProvider__icon"/>
                </ElButton>
            </div>

            <BaseFormField
                v-model="email"
                :field-view="fieldsViews.email"
            />

            <BaseFormField
                v-model="password"
                :field-view="fieldsViews.password"
            />

            <BaseButton
                :disabled="isSubmitButtonDisabled"
                class="loginForm__button"
                type="submit"
                @click="logIn"
                v-text="'Войти'"
            />
        </form>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { FirebaseError } from 'firebase'
import { Button } from 'element-ui'

import BaseButton from '@x10d/vue-kit/src/components/BaseButton.vue'
import BaseFormField from '@x10d/vue-kit/src/components/BaseFormField.vue'
// @ts-ignore
import InfoIcon from '@x10d/vue-kit/src/assets/icons/info.svg'

import IPropertyFieldView from '@x10d/vue-kit/src/types/IPropertyFieldView.d'

// @ts-ignore
import GoogleIcon from '../assets/svg/google.svg'

import { firebase } from '@/services'


interface IComponentData {
    email : string
    password : string
    isLoading : boolean
    error : FirebaseError | null
    fieldsViews : {
        email : IPropertyFieldView
        password : IPropertyFieldView
    }
}

export default Vue.extend({
    name: 'Login',

    components: {
        BaseFormField,
        BaseButton,
        InfoIcon,
        GoogleIcon,
        [Button.name]: Button,
    },

    data() : IComponentData {
        return {
            email: '',
            password: '',
            isLoading: false,
            error: null,
            fieldsViews: {
                email: {
                    name: 'email',
                    typeOfControl: 'string',
                    specificControlProps: {
                        placeholder: 'Почта',
                    },
                    title: 'Почта',
                    labelPosition: 'none',
                },
                password: {
                    name: 'password',
                    typeOfControl: 'password',
                    specificControlProps: {
                        placeholder: 'Пароль',
                    },
                    title: 'Пароль',
                    labelPosition: 'none',
                },
            },
        }
    },

    computed: {
        isSubmitButtonDisabled() : boolean {
            return !this.email || !this.password
        },
    },

    methods: {
        async logIn(provider ?: string) : Promise<void> {
            try {
                this.isLoading = true
                this.error = null

                if (provider === 'google') {
                    await firebase.signInWithGoogle()
                }
                else {
                    await firebase.signInWithEmailAndPassword(
                        this.email,
                        this.password,
                    )
                }
            }
            catch (error) {
                this.error = error
            }
            finally {
                this.isLoading = false
            }
        },
    },
})

</script>

<style scoped lang="stylus">
@import "../styles/palette.styl"
@import "~@x10d/vue-kit/src/styles/variables/colors.styl"
@import "~@x10d/vue-kit/src/styles/mixins/utils.styl"

$formFieldHeight = 40px
$formFieldMargin = 15px


.login
  flex 1 1 auto
  display flex
  justify-content center
  align-items flex-start
  background-color $catskill-white

.loginForm
  display flex
  flex-direction column
  width 332px
  margin-top 30vh
  padding 28px 36px 36px
  background-color $globalColorWhite
  border-radius 10px
  box-shadow 0 16px 24px 0 rgba(0, 0, 0, 0.15)

.loginForm__title
  text-align center
  font-size 16px
  font-weight 500
  line-height 36px
  color $globalColorNileBlue

.loginForm__error
  display flex
  align-items center
  margin-top 17px
  padding 13px 16px
  background-color $crimson
  border-radius 4px

  svg
    flex 0 0 auto
    margin-right 10px
    fill $globalColorWhite


.loginForm__errorText
  font-size 12px
  line-height 16px
  color $globalColorWhite

.loginForm__providers-cnt
  display flex
  align-items center
  justify-content center
  margin-top 14px

.loginFormProvider__icon
  width 16px
  height @width

.loginForm__button
  display block
  margin-top $formFieldMargin
  height $formFieldHeight
  font-size 15px
  line-height 18px
  letter-spacing 0.04em

  // Переопределим стандартные свойства кнопки
  font-weight 500
  color $globalColorWhite
  background-color $caribbean-green

  &:disabled
    color $globalColorLoblolly
    background-color $globalColorCatskillWhite

  &:hover:not(:disabled),
  &:focus:not(:disabled)
    background-color $caribbean-green-almost

// Переопределим свойства baseFormField'a
/deep/ .baseInput
  height $formFieldHeight
  padding 12px 8px

/deep/ .baseInputPassword__changePasswordVisibilityBtn
  height $formFieldHeight
  width @height
</style>
