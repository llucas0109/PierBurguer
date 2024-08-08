import React from 'react'

import PropTypes from 'prop-types'

import { UserProvider } from './UserContext.js'
import { CartProvider } from './CartContext.js'

const AppProvider = ({ children }) => (
<CartProvider>
  <UserProvider>{children}</UserProvider>
</CartProvider>
)

AppProvider.propTypes = {
children: PropTypes.node
}

export default AppProvider