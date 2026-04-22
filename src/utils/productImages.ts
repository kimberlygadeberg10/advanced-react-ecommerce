const categoryImageMap: Record<string, string> = {
  clothing:
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80",
  shoes:
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
  accessories:
    "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80",
  electronics:
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80",
  jewelry:
    "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=600&q=80",
};

function isPlaceholderImageUrl(imageUrl: string) {
  return (
    imageUrl.includes("placehold.co") ||
    imageUrl.includes("via.placeholder.com") ||
    imageUrl.includes("placehold.it")
  );
}

export function getFallbackProductImage(category: string, title: string) {
  const normalizedCategory = category.trim().toLowerCase();

  if (normalizedCategory in categoryImageMap) {
    return categoryImageMap[normalizedCategory];
  }

  const normalizedTitle = title.trim().toLowerCase();

  if (normalizedTitle.includes("shirt") || normalizedTitle.includes("hoodie")) {
    return categoryImageMap.clothing;
  }

  if (
    normalizedTitle.includes("shoe") ||
    normalizedTitle.includes("sneaker") ||
    normalizedTitle.includes("boot")
  ) {
    return categoryImageMap.shoes;
  }

  if (
    normalizedTitle.includes("bag") ||
    normalizedTitle.includes("backpack") ||
    normalizedTitle.includes("watch")
  ) {
    return categoryImageMap.accessories;
  }

  if (
    normalizedTitle.includes("phone") ||
    normalizedTitle.includes("headphone") ||
    normalizedTitle.includes("laptop")
  ) {
    return categoryImageMap.electronics;
  }

  return "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80";
}

export function getProductImageSrc(
  imageUrl: string,
  category: string,
  title: string,
) {
  if (!imageUrl.trim() || isPlaceholderImageUrl(imageUrl)) {
    return getFallbackProductImage(category, title);
  }

  return imageUrl;
}
