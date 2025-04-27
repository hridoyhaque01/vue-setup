import { toast } from 'vue3-toastify'

export const errorNotify = (message) => {
  toast.error(message, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 4000
  })
}

export const infoNotify = (message) => {
  toast.info(message, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 4000
  })
}

export const successNotify = (message) => {
  toast.success(message, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 4000
  })
}

export const warningNotify = (message) => {
  toast.warning(message, {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 4000
  })
}
