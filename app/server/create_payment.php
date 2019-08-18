<?php
require_once "config.php";
require_once "PayPalPayment.php";

$success = 0;
$msg = "Une erreur est survenue, merci de bien vouloir réessayer ultérieurement...";
$paypal_response = [];

$payer = new PayPalPayment();
$payer->setSandboxMode(1);
$payer->setClientID("AdvbGYqkJavMXk_zGfESOPg5RkAOQ9JMMNAIG2hQg3wSXPd5dtZ0pewsn-raSsyQx_ngOW0-gnVW5_gY");
$payer->setSecret("EHgmD1sEzLs9k8cnwcWDsdW4veBM7TLVCM2ZNXlQdyTZzm9kMnb2bLZP8sUJ-aTRAVlPOhCHTKMCEnAz");

$payment_data = [
   "intent" => "sale",
   "redirect_urls" => [
      "return_url" => "http://localhost/",
      "cancel_url" => "http://localhost/"
   ],
   "payer" => [
      "payment_method" => "paypal"
   ],
   "transactions" => [
      [
         "amount" => [
            "total" => "9.99",
            "currency" => "EUR"
         ],
         "item_list" => [
            "items" => [
               [
                  "sku" => "1PK5Z9",
                  "quantity" => "1",
                  "name" => "Un produit quelconque",
                  "price" => "9.99",
                  "currency" => "EUR"
               ]
            ]
         ],
         "description" => "Description du paiement..."
      ]
   ]
];

$paypal_response = $payer->createPayment($payment_data);
$paypal_response = json_decode($paypal_response);

if (!empty($paypal_response->id)) {
   $insert = $bdd->prepare("INSERT INTO paiements (payment_id, payment_status, payment_amount, payment_currency, payment_date, payer_email, payer_paypal_id, payer_first_name, payer_last_name) VALUES (:payment_id, 😛ayment_status, 😛ayment_amount, 😛ayment_currency, NOW(), '', '', '', '')");
   
   $insert_ok = $insert->execute(array(
         "payment_id" => $paypal_response->id,
         "payment_status" => $paypal_response->state,
         "payment_amount" => $paypal_response->transactions[0]->amount->total,
         "payment_currency" => $paypal_response->transactions[0]->amount->currency,
      ));

   if ($insert_ok) {
      $success = 1;
      $msg = "";
   }
} else {
   $msg = "Une erreur est survenue durant la communication avec les serveurs de PayPal. Merci de bien vouloir réessayer ultérieurement.";
}

echo json_encode(["success" => $success, "msg" => $msg, "paypal_response" => $paypal_response]);