"use client";

import { useState } from "react";

const tabs = [
  {
    id: "description",
    label: "Description",
  },
  {
    id: "specifications",
    label: "Specifications",
  },
  {
    id: "shipping",
    label: "Shipping & Returns",
  },
  {
    id: "reviews",
    label: "Reviews",
  },
];

export default function ProductTabs({ product }) {
  const [activeTab, setActiveTab] = useState("description");

  return (
    <section className="mt-20 border-t border-border pt-12">
      {/* Tab Navigation */}

      <div className="overflow-x-auto">
        <div className="flex min-w-max gap-8 border-b border-border">
          {tabs.map((tab) => {
            const active = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`
                  relative
                  pb-4
                  text-sm
                  font-medium
                  transition-colors
                  ${
                    active
                      ? "text-primary"
                      : "text-gray-500 hover:text-gray-900"
                  }
                `}
              >
                {tab.label}

                {active && (
                  <span className="absolute bottom-0 left-0 h-0.5 w-full bg-primary" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}

      <div className="max-w-4xl py-10">
        {activeTab === "description" && (
          <Description product={product} />
        )}

        {activeTab === "specifications" && (
          <Specifications product={product} />
        )}

        {activeTab === "shipping" && (
          <Shipping />
        )}

        {activeTab === "reviews" && (
          <Reviews product={product} />
        )}
      </div>
    </section>
  );
}

function Description({ product }) {
  return (
    <div>
      <h2 className="text-xl font-semibold">
        Product Description
      </h2>

      <div className="mt-5 space-y-4 leading-8 text-gray-600">
        <p>
          {product.description ||
            product.shortDescription ||
            "No description available."}
        </p>
      </div>
    </div>
  );
}

function Specifications({ product }) {
  const specifications = product.specifications || [];

  return (
    <div>
      <h2 className="text-xl font-semibold">
        Product Specifications
      </h2>

      {specifications.length > 0 ? (
        <div className="mt-6 overflow-hidden rounded-2xl border border-border">
          {specifications.map((item, index) => (
            <div
              key={index}
              className={`
                grid
                grid-cols-1
                gap-2
                px-6
                py-5
                sm:grid-cols-2
                ${
                  index !== specifications.length - 1
                    ? "border-b border-border"
                    : ""
                }
              `}
            >
              <span className="font-medium">
                {item.label}
              </span>

              <span className="text-gray-600">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-5 text-gray-500">
          Specifications will be available soon.
        </p>
      )}
    </div>
  );
}

function Shipping() {
  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-xl font-semibold">
          Shipping
        </h2>

        <p className="mt-4 leading-8 text-gray-600">
          Orders are carefully packed and dispatched
          within the estimated processing time. Delivery
          times may vary depending on your location.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold">
          Returns & Exchanges
        </h2>

        <p className="mt-4 leading-8 text-gray-600">
          If you receive a damaged or incorrect product,
          please contact our support team within the
          applicable return period.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold">
          Order Support
        </h2>

        <p className="mt-4 leading-8 text-gray-600">
          For questions regarding your order, shipping,
          or returns, please contact our customer support
          team.
        </p>
      </div>
    </div>
  );
}

function Reviews({ product }) {
  const reviewCount = product.reviewCount || 0;
  const rating = product.rating || 0;

  return (
    <div>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold">
            Customer Reviews
          </h2>

          <p className="mt-2 text-gray-500">
            {reviewCount} reviews
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-3xl font-semibold">
            {rating.toFixed(1)}
          </span>

          <div>
            <div className="text-primary">
              {"★".repeat(Math.round(rating))}
              {"☆".repeat(5 - Math.round(rating))}
            </div>

            <p className="text-sm text-gray-500">
              Overall rating
            </p>
          </div>
        </div>
      </div>

      <div className="mt-10 rounded-2xl border border-dashed border-border p-8 text-center">
        <p className="text-gray-500">
          Customer reviews will appear here.
        </p>
      </div>
    </div>
  );
}