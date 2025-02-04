// services/paymentService.js
const axios = require("axios");
const { v4: uuidv4 } = require("uuid");
const referenceId = uuidv4();
require("dotenv").config();

/**
 * Récupère le token d'accès depuis l'API MoMo.
 * Cette étape utilise l'authentification Basic avec MOMO_USER_ID et MOMO_API_KEY.
 */
const getMoMoToken = async () => {
  try {
    const response = await axios.post(
      // On retire le segment /requesttopay de la base URL pour obtenir l'URL du token
      `${process.env.MOMO_BASE_URL.replace("/requesttopay", "")}/token/`,
      {},
      {
        headers: {
          "Ocp-Apim-Subscription-Key": process.env.MOMO_SUBSCRIPTION_KEY,
          Authorization:
            "Basic " +
            Buffer.from(
              `${referenceId}:${process.env.MOMO_API_KEY}`
            ).toString("base64"),
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.access_token;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération du token MoMo :",
      error.response?.data || error.message
    );
    throw error;
  }
};

/**
 * Initie une RequestToPay auprès de l'API MoMo.
 * @param {string|number} amount - Montant à débiter
 * @param {string} orderId - Identifiant externe de la transaction (pour la réconciliation)
 * @returns {Object} Résultat contenant le status et le X-Reference-Id généré
 */
const initiateRequestToPay = async (amount, orderId) => {
  try {
    // 1. Récupérer le token d'accès
    const accessToken = await getMoMoToken();

    // 2. Générer un identifiant unique (UUID) pour la transaction
    //const referenceId = uuidv4();

    // 3. Préparer le payload de la RequestToPay
    const requestPayload = {
      amount: amount.toString(), // Le montant doit être une chaîne de caractères
      currency: process.env.MOMO_CURRENCY, // Devise, ex: "XOF"
      externalId: orderId, // Référence externe pour la transaction
      payer: {
        partyIdType: "MSISDN", // Type d'identifiant (ici numéro de mobile)
        partyId: process.env.MOMO_PARTY_ID, // Numéro de mobile du payeur
      },
      payerMessage: `Paiement de la commande ${orderId}`,
      payeeNote: "Merci pour votre achat",
    };

    // 4. Envoyer la requête RequestToPay
    const response = await axios.post(
      `${process.env.MOMO_BASE_URL}/requesttopay`,
      requestPayload,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "X-Reference-Id": referenceId,
          "X-Target-Environment": process.env.MOMO_TARGET_ENV,
          "Ocp-Apim-Subscription-Key": process.env.MOMO_SUBSCRIPTION_KEY,
          "Content-Type": "application/json",
          // Optionnel : "X-Callback-Url": "https://ton-domaine.com/callback"
        },
      }
    );

    console.log("RequestToPay envoyée avec succès !");
    return {
      status: "SUCCESS",
      referenceId,
      message: "RequestToPay initiée avec succès.",
    };
  } catch (error) {
    console.error(
      "Erreur lors de l'initiation de RequestToPay :",
      error.response?.data || error.message
    );
    return { status: "FAILED", error: error.response?.data || error.message };
  }
};

module.exports = {
  getMoMoToken,
  initiateRequestToPay,
};
