import React from "react"
import InputMask from "react-input-mask"

const InputMaskPurchaseOrder = () => {
  return (
    <React.Fragment>
      <div className="text-bold-600 font-medium-2 my-1">
        Purchase Order <small>aaaa 9999-****</small>
      </div>
      <InputMask
        className="form-control"
        mask="aaaa 9999-****"
        placeholder="Enter Purchase Order"
      />
    </React.Fragment>
  )
}

export default InputMaskPurchaseOrder
