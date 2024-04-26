

const formatSlotData = (data) => {
    return { 
        [`slot-${data.slotNum}`]: data,
        [`playerData-${data.slotNum}`]: {}
};
  };

module.exports = {
    formatSlotData
}