Serwer Ahead Live Streaming
=============================

Serwer **Ahead** Live Streaming jest dedykowanym systemem strumieniowania wideo na żywo w protokołach HLS i DASH
zapewniającym super niską całkowitą zwłokę między kamerą, a odtwarzaczem. Całkowity system dostarczania wideo dodaje
tylko  długość jednego framentu strumienia wideo korzystając przy tym z dowolnego obecnie wykorzystywanego odtwarzacza.
Oznacza to, że cały system generuje raptem **jedno sekundową zwłokę** w całym łańcuchu dostarczania wideo. Dla
porówniania rynkowy standard to około 10 sekund jak w przypadku Wowza, czy Unified Streaming i około 15 sekund w wideo
na żywo w sieciach społecznościowych, np. na Facebooku.

Serwer **Ahead** oferuje następujące przewagi konkurencyjne:

* **Oparcie na standardach**: Rozwiązanie w pełni spełnia standardy HLS i DASH (nie jest to hack, to po prostu streaming napisany poprawnie)
* **Szybkość**: Pozwala na niemalże 1-sekundową zwłokę dla HLS i DASH (ponad 10 razy szybciej niż u konkurencji)
* **Efektywność kosztowa**: Rozwiązanie wyłącznie serwerowe działające z dowolnym obecnym odtwarzaczem (nie ma konieczności zmian w aplikacjach i wdrażania nowego playera)
* **Elastyczność**: Obłsuguje dowolne formy strumieniowania ze źródła (rtmp, rtsp, rtp, udp, direct i dowolne inne obsłuiwane przez ffmpeg)
* **Kompletność**: Rozwiązanie zawiera wszystkie elementy wymagane do integracji z dowolnym istniejącym serwisem i aplikacjami.
* **Dostępność**: Strumienie HLS i DASH są dozwolone przez wszystkie firewalle, pracują poprawnie we wszystkich sieciach (w tym korporacyjnych)
* **Efficient**: **Ahead** jest wydajny pod względem użycia pamięci operacyjnej i dyskowej oraz obciążenia CPU

Signicode
-----------

Signicode, twórcy Serwera **Ahead**, jest firmą technologiczną z Warszawy. Firma jest zbudowana wokół zespołu
doświadczonych ludzi pochodzących z branż strumieniowania danych i wideo. Michał Czapracki, założyciel Signicode spędził
ostatnie 10 lat pracując nad dużej skali polskimi portalami wideo, w tym Gazeta.tv, Onet.tv, tvn24.pl oraz nad dużymi
międzynarodowymi usługami takimi jak BeIN Sports, czy Fiński Fanseat.

Dzięki Serwerowi **Ahead**, Signicode ma możliwość zbudowania ekosystemu drugiej generacji strumieniowania wideo na
żywo. Ekosystem składający się z dobrze zbudowanych enkoderów, systemów CDN, platform wideo oraz sieci szkieletowych
pozwoli na dalsze optymalizacje zwłoki do celu znajdującego się poniżej 1 sekundy, przy pełnym respektowaniu
[Reguł neutralności sieci EU / Reg 2015/2120](http://eur-lex.europa.eu/legal-content/EN/TXT/?uri=uriserv:OJ.L_.2015.310.01.0001.01.ENG&toc=OJ:L:2015:310:TOC).

Aby to osiągnąć Signicode poszukuje partnerów w następujących obszarach:

 * Nadawców i firm medialnych - jednostek produkujących strumienie live
 * Dostawców platform OTT/OVP - jednostek obsługujących strumienie live
 * Dostawców usług CDN - jednostek realizujących dostarczanie strumieni live
 * Integratorów i twórców oprogramowania Web - jednostek tworzących rozwijających całościowe systemy aplikacji
 * Dostawców usług Internetowych - jednostek zapewniających topologie sieciowe dla strumieni live

Wszystkie te obszary to grupy potencjalnych klientów dla Signicode oraz grupy osiągające dodatkowe korzyści uzyskując
dostęp do Serwera **Ahead** wcześniej niż konurencja, czy mogący wpłynąć na kierunek rozwoju tego systemu.

Stąd też Signicode oferuje swoim partnerom:

 * Przedpremierowe wdrożenie Serwera **Ahead**,
 * Wsparcie dedykowanej integracji z dowolną istniejącą usługą, na prywatnej infrastrukturze,
 * Dostęp do kodu źródłowego dającego możliwość dostosowania serwera do własnych potrzeb, wraz z odpowiednim szkoleniem,
 * Oferty inwestycji w przedsięwzięcie zapewniające wszystko powyżej, powiększone o możliwość bezpośredniego wpływu na kierunek rozwoju ekosystemu.

Przykład Działania
--------------------

Poniższy przykład jest uwidocznieniem niskiej zwłoki pomiędzy kamerą, a odtwarzaczem osiągniętej za pomocą **Serwera**
**Ahead**. Nagranie to ukazuje wideo, nagrane przez **Serwer Ahead**, wykonane poprzez wskazanie kamerą monitora
wyświetalającego ten sam strumień.

<video src="https://miura.signicode.com/zweb/alss-demo-2017-04-11-1.mp4" controls width="640" height="360"></video>

Takie ustawienie powoduje powstanie efekty wizualnego sprzeżenia zwrotnego, bezpośrednio zależnego od zwłoki pomiędzy
kamerą, a monitorem. Obraz nagrywany przez kamerę jest wysyłany do encodera, podzielony na fragmenty, pobrany przez CDN,
a następnie odtwarzacz, po czym wyświetlony na monitorze na który wskazana jest kamera. W rezultacie użytkownik widzi
nieskończoną pętlę wideo, przypominającą efekt ustawienia naprzeciw siebie dwóch luster, jednak z widzoczną zwłoką
pomiędzy pojawianiem się kolejnych obrazów. Ta zwłoka jest dokładnie równa opóźnieniu pomiędzy kamerą, a odtwarzaczem. W
powyższym wypadku mieści się ona znacząco poniżej 2 sekund, pomimo użycia sprzętu z niskiej półki i braku znaczących
optymalizacji procesu enkodowania i odtwarzacza.

"Maszyneria" tu użyta jest następująca:

* Jeden Standardowy, nie zmodyfikowany [odtwarzacz HLS.js v0.7.5 ze strony Streambox.fr](http://streambox.fr/mse/hls.js-0.7.5/demo/)
* Jedna Tania kamera internetowa Creative USB 2.0
* Dla komputery [Intel NUC NUC5i5RYH](https://www-ssl.intel.com/content/www/us/en/nuc/nuc-kit-nuc5i5ryh.html) (i5-5250U CPU, 16 GB RAM)
  * Jeden pracujący jako serwer grabbera i enkodera,
  * Drugi pracujący jako serwer CDN,
  * Oba ustawione jeden na drugim zamiast statywu z którym tania kamera nie może współpracować. ;)
* Jeden [laptop Asus UX32VD](https://www.asus.com/Notebooks/ASUS-ZenBook-UX32VD/) jako odtwarzacz
* Jeden monitor Samsung
