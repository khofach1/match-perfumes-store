import HeroSlider from "@/components/home/HeroSlider";
import ExploreMatchWorld from "@/components/home/ExploreMatchWorld";
import SelectedPackages from "@/components/home/SelectedPackages";
import MatchBeautyBanner from "@/components/home/MatchBeautyBanner";
import CustomerReviews from "@/components/home/CustomerReviews";

export default function Home() {
  return (
    <>
      <HeroSlider />
      <ExploreMatchWorld />
      <SelectedPackages />
      <MatchBeautyBanner />
      <CustomerReviews />
    </>
  );
}
