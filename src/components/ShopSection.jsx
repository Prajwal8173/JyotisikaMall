import React, { useEffect, useState } from "react";
import axios from "axios";

const ShopSection = () => {
    const [products, setProducts] = useState([]);
    const [energyStones, setEnergyStones] = useState([]);

    // Fetch Products from PHP API
    useEffect(() => {
        const fetchData = async () => {
            try {
                // API call for products
                const productRes = await axios.get(
                    "http://localhost/User_Api_Controller/"
                );
                console.log("Products API Response:", productRes.data);

                // API call for stones
                const stoneRes = await axios.get("http://localhost/api/stones.php");
                console.log("Stones API Response:", stoneRes.data);

                // Handle array or object with `data`
                const productData = Array.isArray(productRes.data)
                    ? productRes.data
                    : productRes.data.data || [];

                const stoneData = Array.isArray(stoneRes.data)
                    ? stoneRes.data
                    : stoneRes.data.data || [];

                setProducts(productData);
                setEnergyStones(stoneData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);


    const getCurrentSlideProducts = () => {
        return products.slice(0, 8);
    };

    const getCurrentStoneProducts = () => {
        return energyStones.slice(0, 4);
    };

    return (
        <div>
            {/* Best Sellers */}
            <div className="container mt-5 text-center">
                <h1>Shop Our Best Seller</h1>
                <div className="product-carousel-container position-relative">
                    <div className="product-carousel-wrapper">
                        <div className="row">
                            {getCurrentSlideProducts().map((product, index) => (
                                <div key={product.id || index} className="col-md-3 col-lg-3 mb-3">
                                    <div
                                        className={`card product-card border-0 text-center h-100 ${index === 3 ? "new-card" : ""
                                            }`}
                                    >
                                        <div className="position-relative">
                                            <img
                                                src={product.image || "https://via.placeholder.com/200"}
                                                className="card-img-top product-image"
                                                alt={product.name || "Product"}
                                            />
                                            {product.discount && (
                                                <span className="discount-badge">{product.discount}</span>
                                            )}
                                            {index === 3 && <span className="new-badge">NEW</span>}
                                        </div>
                                        <div className="card-body d-flex flex-column">
                                            <h6 className="card-title">{product.name}</h6>
                                            <div className="rating mb-2">
                                                {[...Array(product.rating || 0)].map((_, i) => (
                                                    <span key={i} className="star">⭐</span>
                                                ))}
                                            </div>
                                            <div className="price-section mt-auto">
                                                <span className="current-price">₹{product.price || 0}</span>
                                                {product.originalPrice &&
                                                    product.price !== product.originalPrice && (
                                                        <del className="original-price">₹{product.originalPrice}</del>
                                                    )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>

            {/* Energy Stones Section */}
            <div className="container mt-5">
                <h1 className="text-center mb-4">Energy Stones</h1>
                <div className="product-carousel-container position-relative">
                    <div className="product-carousel-wrapper">
                        <div className="row">
                            {getCurrentStoneProducts().map((stone, index) => (
                                <div key={stone.id || index} className="col-md-3 col-lg-3 mb-3">
                                    <div
                                        className={`card product-card border-0 text-center h-100 ${index === 3 ? "new-card stone-card" : "stone-card"
                                            }`}
                                    >
                                        <div className="position-relative">
                                            <img
                                                src={stone.image || "https://via.placeholder.com/200"}
                                                className="card-img-top product-image"
                                                alt={stone.name || "Stone"}
                                            />
                                            {stone.discount && (
                                                <span className="discount-badge">{stone.discount}</span>
                                            )}
                                            {index === 3 && (
                                                <span className="new-badge stone-new-badge">NEW</span>
                                            )}
                                        </div>
                                        <div className="card-body d-flex flex-column">
                                            <h6 className="card-title">{stone.name}</h6>
                                            <div className="rating mb-2">
                                                {[...Array(stone.rating || 0)].map((_, i) => (
                                                    <span key={i} className="star">⭐</span>
                                                ))}
                                            </div>
                                            <div className="price-section mt-auto">
                                                <span className="current-price">
                                                    ₹{stone.price || 0}
                                                </span>
                                                {stone.originalPrice &&
                                                    stone.price !== stone.originalPrice && (
                                                        <del className="original-price">
                                                            ₹{stone.originalPrice}
                                                        </del>
                                                    )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShopSection;
