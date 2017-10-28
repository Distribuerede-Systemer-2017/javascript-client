$(document).ready(() => {

  SDK.User.loadNav();

  const currentUser = SDK.User.current();
  const $modalTbody = $("#basket-tbody");
  const $checkoutActions = $("#checkout-actions");
  const $nothingInBasketContainer = $("#nothing-in-basket-container");
  const basket = SDK.Storage.load("basket") || [];
  let total = 0;

  $nothingInBasketContainer.show();

  if(!basket.length){
    $("#checkout-table-container").hide();
  } else {
    $nothingInBasketContainer.hide();
  }

  basket.forEach(entry => {
    let subtotal = entry.book.price * entry.count;
    total += subtotal;
    $modalTbody.append(`
        <tr>
            <td>
                <img src="${entry.book.imgUrl}" height="120"/>
            </td>
            <td>${entry.book.title}</td>
            <td>${entry.count}</td>
            <td>kr. ${entry.book.price}</td>
            <td>kr. ${subtotal}</td>
        </tr>
      `);
  });

  $modalTbody.append(`
      <tr>
        <td colspan="3"></td>
        <td><b>Total</b></td>
        <td>kr. ${total}</td>
      </tr>
    `);

  if (currentUser) {
    $checkoutActions.html(`
      <button class="btn btn-success btn-lg">Checkout</button>
    `);
  }
  else {
    $checkoutActions.html(`
      <a href="login.html">
        <button class="btn btn-primary btn-lg">Log in to checkout</button>
      </a>
    `);
  }


});