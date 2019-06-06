export const listData = {
  state: [{title : 'รายรับ', value : 10}],
  reducers: {
    addItem(state, payload) {
      return [payload,...state]
    }
  },
};


