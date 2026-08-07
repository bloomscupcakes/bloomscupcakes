export default {
  async fetch(request, env) {
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    if (request.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    try {
      const payload = await request.json();
      const { customer, fulfillment, order } = payload;

      const customerEmail = customer?.email || "";
      
      // 1. Create a encoded mailto link with pre-filled subject line
      const subject = encodeURIComponent(`Blooms Cupcakes Order Update - ${customer?.name || "Customer"}`);
      const mailtoUrl = `mailto:${customerEmail}?subject=${subject}`;

      // 2. Format customer field with clickable Discord markdown links
      const customerField = 
        `**Name:** ${customer?.name || "N/A"}\n` +
        `**Email:** [${customerEmail}](${mailtoUrl}) ✉️ *(Click to Email)*\n` +
        `**Phone:** ${customer?.phone ? `[${customer.phone}](tel:${customer.phone})` : "N/A"}\n` +
        `**Contact Pref:** ${customer?.contactPreference || "Email"}`;

      const itemsList = order?.items
        ?.map(
          (item) =>
            `• **${item.productTitle}** (${item.quantity}x)\n` +
            `  - Pack: ${item.packSize} | Flavour: ${item.flavour}` +
            (item.filling ? ` | Filling: ${item.filling}` : "") +
            `\n  - Price: $${(item.pricePerUnit * item.quantity).toFixed(2)}`
        )
        .join("\n\n") || "No items specified";

      const discordPayload = {
        username: "Order Bot",
        embeds: [
          {
            title: "🧁 New Order Inquiry Received!",
            color: 0xE91E63,
            fields: [
              {
                name: "👤 Customer Details",
                value: customerField,
                inline: false,
              },
              {
                name: "🚗 Fulfillment",
                value: `**Method:** ${(fulfillment?.method || "pickup").toUpperCase()}\n**Address:** ${fulfillment?.address || "Pickup"}\n**Date:** ${order?.pickupDate || "Not specified"}`,
                inline: false,
              },
              {
                name: "📦 Items Ordered",
                value: itemsList,
                inline: false,
              },
              {
                name: "💰 Order Summary",
                value: `**Total:** $${order?.total || "0.00"}`,
                inline: true,
              },
            ],
            timestamp: new Date().toISOString(),
          },
        ],
      };

      if (order?.notes) {
        discordPayload.embeds[0].fields.push({
          name: "📝 Customer Notes",
          value: order.notes,
          inline: false,
        });
      }

      // Send to Discord
      if (env.DISCORD_WEBHOOK_URL) {
        const response = await fetch(env.DISCORD_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(discordPayload),
        });

        if (!response.ok) {
          throw new Error("Discord API call failed");
        }
      }

      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  },
};  