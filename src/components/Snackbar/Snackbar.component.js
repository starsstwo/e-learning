/* @flow */
export default {
  props: {
    vertical: {
      default: 'top',
      type: String
    },
    horizontal: {
      default: 'right',
      type: String
    },
    duration: {
      default: 3000,
      type: Number
    },
    message: {
      default: '',
      type: String
    },
    type: {
      default: 'success',
      type: String
    }
  },
  data () {
    return {
    }
  },
  methods: {
    open() {
      this.$refs.snackbar.open()
    }
  }
}
