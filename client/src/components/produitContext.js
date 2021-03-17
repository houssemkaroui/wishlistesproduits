import React from 'react'

const ProduitContext = React.createContext()

export const ProduitProvider = ProduitContext.Provider
export const ProduitConsumer = ProduitContext.Consumer

export default ProduitContext