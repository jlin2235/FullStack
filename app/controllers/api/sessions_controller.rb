class Api::SessionsController < ApplicationController
#  skip_before_action :verify_authenticity_token  


    def create
        @user = User.find_by_credentials(
        params[:user][:email],
        params[:user][:password]
        )

        if @user    
            login!(@user)
            render "api/users/show"
        else
            render json: ["Unable to log in with provided credentials"], status: 401
        end
    end

    def destroy
        @user = current_user
        if @user
            log_out!
            render json: ["Sign Out"]
        else
            render json: ["Nobody signed in"], status: 404
        end
    end


end
