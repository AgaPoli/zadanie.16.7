//ZMIENNE DO KOMUNIKACJI Z SERWEREM
var baseUrl = 'https://kodilla.com/pl/bootcamp-api';
/*podstawowy adres serwera, 
który wystawia nam endpointy z których będziemy korzystać przy komunikacji */
var myHeaders = {
	'X-Client-Id': '3711',
	'X-Auth-Token': '1fbe403058b58d74b6dcd3ef9b84f8c9'
};
/*Każde zapytanie, które wykonamy, będzie musiało mieć w sobie nagłówki (myHeaders). 
JQuery daje opcję dodania tych nagłówków bez konieczności umieszczania ich 
w każdym zapytaniu osobno. Funkcja, która za to odpowiada, to metoda ajaxSetup() */
$.ajaxSetup({
	headers: myHeaders
});
$.ajax({
	url: baseUrl + '/board',
	method: 'GET',
	success: function(response) {
		setupColumns(response.columns);
		/*Po odebraniu odpowiedzi możemy przejść do tworzenia kolumn, 
			  stąd funkcja setupColumns(response.columns) */
	}
});
/**Tworzenie kolumn
Przejdźmy teraz do implementacji funkcji setupColumns(). 
To, co funkcja musi wykonać, to stworzenie tylu kolumn, ile dostaliśmy w odpowiedzi z serwera, 
następnie zaś każdą z nich musi przypiąć do tablicy (tej, którą widzimy na stronie). */
/*KonstrukcjA forEach()- Oznacza ona, że dla każdego elementu (kolumny) znajdującej się w tablicy kolumn
 ma się wykonać pewna funkcja. Ta funkcja, musi stworzyć kolumnę i dodać ją do tablicy  */
function setupColumns(columns) {
	columns.forEach(function(column) {
		var col = new Column(column.id, column.name);
		board.createColumn(col);
		setupCards(col, column.cards); /*TWORZYMY KARTY W KOLUMNIE Informację do nich również dostajemy w odpowiedzi z endpointa /board*/
	});
	/*Do funkcji przekazujemy kolumnę, do której mają zostać przyczepione karty, które należy stworzyć. Natepnie musimy przeiterować po wszystkich kartach, 
	utworzyć je i dodać do odpowiedniej kolumny */
	function setupCards(col, cards) {
		cards.forEach(function(card) {
			var cardObj = new Card(card.id, card.name, card.bootcamp_kanban_column_id);
			/* (new Card()) jest rozszerzone o kolejne parametry. 
			Poniewaz tworząc nowe obiekty, musimy dopasować się do odpowiedzi serwera. */
			col.createCard(cardObj);
		})
	};
}
// OGÓLNA FUNKCJA
function randomString() {
	var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ'.split();
	var str = '',
		i;
	for (i = 0; i < 10; i++) {
		str += chars[Math.floor(Math.random() * chars.length)];
	}
	return str;
}