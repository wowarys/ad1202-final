import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { GetProductById, getUserHistory } from "../api/api";
import { Receipt, Loader2 } from "lucide-react";

interface PurchaseHistory {
  user_id: string;
  product_id: string;
  quantity: number;
  total_price: number;
  title: string;
}

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
interface ProductDetails {
  id: number;
  discount: number;
  imageSrc: string;
}

const UserPurchasesHistoryPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [purchaseHistory, setPurchaseHistory] = useState<PurchaseHistory[]>([]);
  const [adjustedPrices, setAdjustedPrices] = useState<{
    [key: string]: number;
  }>({});
  const [productImages, setProductImages] = useState<{ [key: string]: string }>(
    {}
  );

  useEffect(() => {
    const fetchHistory = async () => {
      setIsLoading(true);
      try {
        const history = await getUserHistory();
        setPurchaseHistory(history);

        const prices: { [key: string]: number } = {};
        const images: { [key: string]: string } = {};

        for (const purchase of history) {
          const product = await GetProductById(Number(purchase.product_id));
          const originalUnitPrice = purchase.total_price / purchase.quantity;
          const discountedUnitPrice =
            originalUnitPrice * (1 - product.discount / 100);
          const finalTotalPrice = discountedUnitPrice * purchase.quantity;

          prices[purchase.product_id] = finalTotalPrice;
          images[purchase.product_id] = product.imageSrc;
        }

        setAdjustedPrices(prices);
        setProductImages(images);
      } catch (error) {
        console.error("Error fetching purchase history:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (isLoading) {
    return (
      <div className="container max-w-4xl !py-8 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="container max-w-4xl !py-8">
      <Card className="w-full bg-white shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
              <Receipt className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold">
                История покупок
              </CardTitle>
              <CardDescription>Ваши последние покупки</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {purchaseHistory.map((purchase) => (
            <Card key={`${purchase.product_id}-${purchase.user_id}`}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex gap-4">
                    <img
                      src={productImages[purchase.product_id]}
                      alt={purchase.title}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div>
                      <h3 className="font-semibold text-lg mb-2">
                        {purchase.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Количество: {purchase.quantity}
                      </p>
                      <p className="text-sm text-gray-600">
                        Изначальная цена: ${purchase.total_price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-600">
                      Итоговая цена: $
                      {adjustedPrices[purchase.product_id]?.toFixed(2)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          {purchaseHistory.length === 0 && (
            <p className="text-center text-gray-500">История покупок пуста</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserPurchasesHistoryPage;
