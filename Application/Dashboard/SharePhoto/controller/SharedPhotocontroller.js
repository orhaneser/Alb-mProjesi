aplication.directive("fileInput",function($parse){ //elementlerin davranışlarını değiştirebilmek-- oluşturdun directivi elementlere yüklemek
    return{
        link:function($scope,element,attrs){
            element.on("change",function(event){
                const uzantilar=["jpeg","jpg","png"];
                const turler=["image/jpeg","image/png","image/jpg"];
                const files=event.target.files;
                const type=event.target.files[0].type;
                const size=event.target.files[0].size;
                const name=event.target.files[0].name;
                const nokta=name.substr(name.indexOf(".")+1);
                const sonuc=uzantilar.indexOf(nokta);
                const sonuc2=turler.indexOf(type);
                if(size>1024*1024*5)
                {
                    Component.showmessage("Uyarı","Fotoğraf Boyutu 5M dan daha büyük olamaz.")
                    element.css({'color':'red'});
                }
                else if(sonuc<0)
                {
                    Component.showmessage("Uyarı","Fotoğraf Dosyaları jpg-png olmalıdır.")
                    element.css({'color':'red'});
                }
                else if(sonuc2<0)
                {
                    Component.showmessage("Uyarı","Fotoğraf Dosyaları jpg-png olmalıdır.")
                    element.css({'color':'red'});
                }
                else
                {
                    element.css({'color':'green'})
                    var file= $parse(attrs.fileInput).assign($scope,element[0].files);
                    $scope.$apply(function () {
                        Component.readFileToBase64(file[0]).then(function (res) {
                            $scope.file=res;
                        });
                    });


                }
            });
        }
    }
});
aplication.controller("sharedphotoctrl",function ($scope,$location) {
    $scope.test=()=>{
        console.log($scope.file.base64);
       console.log("sadasd");
   }
});