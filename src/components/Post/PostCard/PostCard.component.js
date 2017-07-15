/* @flow */
import moment from 'moment'

export default {
  props: {
    post: Object,
    type: String
  },
  data () {
    return {
    }
  },
  computed: {
  },
  methods: {
    /**
     * 日付のフォーマットをセット
     */
    formatTime(memoDatetime: string) {
      return moment(new Date(memoDatetime)).format('YYYY-MM-DD HH:mm')
    }
  },
  validations: {
  }
}
